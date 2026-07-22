import type {
  AssessmentState,
  BigFiveResponse,
  EnneagramResponse,
  DiSCResponse,
  StrengthsResponse,
  ImageDecodingResult,
  ResourceAllocationResult,
  SerializableAssessmentState,
} from "./assessment-store";
import { RT_CONFIG } from "./rt-constants";
import {
  BIG_FIVE_QUESTIONS,
  ENNEAGRAM_QUESTIONS,
  STRENGTHS_CARDS,
  JUNGIAN_COGNITIVE_QUESTIONS,
} from "../components/cognis/constants/questions";

function sanitizeRT(
  rt: number,
  baseline: number = RT_CONFIG.DEFAULT_BASELINE,
): number {
  if (rt < RT_CONFIG.MIN_RT || rt > RT_CONFIG.MAX_RT) return baseline;
  return rt;
}

export interface BigFiveResult {
  scores: { O: number; C: number; E: number; A: number; N: number };
  sems: { O: number; C: number; E: number; A: number; N: number };
  traits: string[];
}

export interface EnneagramResult {
  primaryType: number;
  wing: number;
  instinctualVariant: "SP" | "SX" | "SO";
  healthLevel: number;
}

export interface DiSCResult {
  vector: { x: number; y: number };
  quadrant: "D" | "i" | "S" | "C" | "Mixed";
}

export interface StrengthsResult {
  topTalents: string[];
  reactionTimeBaselineMs: number;
}

export interface JungianResult {
  primary: string;
  auxiliary: string;
  tertiary: string;
  inferior: string;
  confidence: "High" | "Medium" | "Low";
}

export interface ComprehensiveReport {
  bigFive: BigFiveResult;
  enneagram: EnneagramResult;
  disc: DiSCResult;
  strengths: StrengthsResult;
  jungian: JungianResult;
  synthesis: {
    corePattern: string;
    consistencyCheck: Record<string, boolean>;
    warnings: string[];
  };
  metadata: {
    calculatedAt: string;
    rtConfidence: number; // 0-1 score based on RT quality
    version: string;
    gear: "short" | "medium" | "full";
    career: "tech" | "business" | "creative" | "finance" | "healthcare" | "legal" | "education" | "manufacturing" | "general";
    interest: "ai" | "finance" | "creative" | "lifestyle";
  };
}

function calculateBigFive(responses: BigFiveResponse[]): BigFiveResult {
  const dimensionResponses: Record<
    "O" | "C" | "E" | "A" | "N",
    Array<{ value: number; a: number; b: number; isReversed: boolean }>
  > = {
    O: [],
    C: [],
    E: [],
    A: [],
    N: [],
  };

  responses.forEach((r) => {
    const q = BIG_FIVE_QUESTIONS.find((x) => x.id === r.questionId);
    if (!q) return;

    const dim = q.dimension;
    if (dim !== "O" && dim !== "C" && dim !== "E" && dim !== "A" && dim !== "N") return;

    dimensionResponses[dim].push({
      value: r.value,
      a: q.a ?? 1.0,
      b: q.b ?? 0.0,
      isReversed: !!q.isReversed,
    });
  });

  const tScores = { O: 50, C: 50, E: 50, A: 50, N: 50 };
  const sems = { O: 4, C: 4, E: 4, A: 4, N: 4 };

  (Object.keys(tScores) as Array<keyof typeof tScores>).forEach((dim) => {
    const list = dimensionResponses[dim];
    if (list.length > 0) {
      // 1. Newton-Raphson MAP Estimation of theta under N(0, 1) prior
      let theta = 0.0;
      const priorMean = 0.0;
      const priorSd = 1.0;

      for (let iter = 0; iter < 20; iter++) {
        let gradient = -(theta - priorMean) / (priorSd ** 2);
        let hessian = -1.0 / (priorSd ** 2);

        list.forEach(({ value, a, b, isReversed }) => {
          const response = isReversed ? 1.0 - value / 100 : value / 100;
          const pTheta = 1.0 / (1.0 + Math.exp(-a * (theta - b)));
          const q = 1.0 - pTheta;

          gradient += a * (response - pTheta);
          hessian -= a ** 2 * pTheta * q;
        });

        const delta = -gradient / hessian;
        theta += delta;
        if (Math.abs(delta) < 1e-6) break;
      }

      // Convert theta to T-score (M=50, SD=10) bounded between [10, 90]
      tScores[dim] = Math.max(10, Math.min(90, Math.round(50 + theta * 10)));

      // 2. Standard Error of Measurement (SEM) Calculation
      const info = list.reduce((sum, { a, b }) => {
        const p = 1.0 / (1.0 + Math.exp(-a * (theta - b)));
        return sum + a ** 2 * p * (1.0 - p);
      }, 0.0);

      // Add prior information to the Fisher information for MAP SEM
      const totalInfo = info + 1.0 / (priorSd ** 2);
      const sem = totalInfo > 0 ? 1.0 / Math.sqrt(totalInfo) : 1.0;
      
      // Scale SEM to T-score metrics (SD=10) and round
      sems[dim] = Math.max(1, Math.min(15, Math.round(sem * 10)));
    }
  });

  return {
    scores: tScores,
    sems: sems,
    traits: Object.entries(tScores)
      .filter(([_, score]) => score > 60)
      .map(([dim]) => dim),
  };
}

function calculateEnneagram(
  responses: EnneagramResponse[],
  neuroticismScore: number,
): EnneagramResult {
  const typeScores: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };
  const instinctScores = { SP: 0, SX: 0, SO: 0 };

  responses.forEach((r) => {
    const q = ENNEAGRAM_QUESTIONS.find((x) => x.id === r.questionId);
    if (!q) return;

    const opt = q.options.find((o) => o.id === r.selectedOption);
    if (opt && opt.scoring) {
      const type = opt.scoring.type;
      const instinct = opt.scoring.instinct;
      typeScores[type] += 1.0;
      if (instinct) {
        instinctScores[instinct]++;
      }
    }
  });

  let primaryType = 1;
  let maxScore = -1;
  Object.entries(typeScores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      primaryType = parseInt(type);
    }
  });

  const instinctualVariant =
    (Object.entries(instinctScores).sort((a, b) => b[1] - a[1])[0]?.[0] as
      | "SP"
      | "SX"
      | "SO") || "SP";

  const leftWing = primaryType === 1 ? 9 : primaryType - 1;
  const rightWing = primaryType === 9 ? 1 : primaryType + 1;
  const wing =
    typeScores[leftWing] > typeScores[rightWing] ? leftWing : rightWing;

  // Health Level derived continuously from N score (Low N = High Health)
  let healthLevel = 5;
  if (neuroticismScore < 30) healthLevel = 1;
  else if (neuroticismScore < 38) healthLevel = 2;
  else if (neuroticismScore < 45) healthLevel = 3;
  else if (neuroticismScore < 51) healthLevel = 4;
  else if (neuroticismScore < 56) healthLevel = 5;
  else if (neuroticismScore < 62) healthLevel = 6;
  else if (neuroticismScore < 70) healthLevel = 7;
  else if (neuroticismScore < 78) healthLevel = 8;
  else healthLevel = 9;

  return { primaryType, wing, instinctualVariant, healthLevel };
}

function calculateDiSC(
  responses: DiSCResponse[],
  resourceAllocations: ResourceAllocationResult[],
): DiSCResult {
  let totalX = 0;
  let totalY = 0;

  responses.forEach((r) => {
    totalX += r.vector.x;
    totalY += r.vector.y;
  });

  const avgX = responses.length > 0 ? totalX / responses.length : 0;
  const avgY = responses.length > 0 ? totalY / responses.length : 0;

  let allocX = 0;
  let allocY = 0;
  if (resourceAllocations && resourceAllocations.length > 0) {
    const allocTask = resourceAllocations[0];
    const allocs = allocTask.allocations;
    const rd = allocs["rd"] || 0;
    const mkt = allocs["mkt"] || 0;
    const ops = allocs["ops"] || 0;
    const hr = allocs["hr"] || 0;

    allocX = (mkt + hr - rd - ops) / 100;
    allocY = (mkt + rd - ops - hr) / 100;
  }

  // 80% weight communication simulation, 20% resource allocation secondary evidence
  const finalX = resourceAllocations && resourceAllocations.length > 0
    ? (avgX * 0.8) + (allocX * 0.2)
    : avgX;
  const finalY = resourceAllocations && resourceAllocations.length > 0
    ? (avgY * 0.8) + (allocY * 0.2)
    : avgY;

  let quadrant: DiSCResult["quadrant"] = "Mixed";

  if (Math.abs(finalX) < 0.2 && Math.abs(finalY) < 0.2) {
    quadrant = "Mixed";
  } else if (finalX < 0 && finalY > 0) {
    quadrant = "D";
  } else if (finalX > 0 && finalY > 0) {
    quadrant = "i";
  } else if (finalX > 0 && finalY < 0) {
    quadrant = "S";
  } else if (finalX < 0 && finalY < 0) {
    quadrant = "C";
  }

  return {
    vector: { x: parseFloat(finalX.toFixed(2)), y: parseFloat(finalY.toFixed(2)) },
    quadrant,
  };
}

function calculateStrengths(responses: StrengthsResponse[]): StrengthsResult {
  // 1. Data Cleaning: Filter out noise
  const validResponses = responses.filter(
    (r) => r.rt > RT_CONFIG.MIN_RT && r.rt < RT_CONFIG.MAX_RT,
  );
  const totalRt = validResponses.reduce((sum, r) => sum + r.rt, 0);
  const baselineRt =
    validResponses.length > 0
      ? totalRt / validResponses.length
      : RT_CONFIG.DEFAULT_BASELINE;

  const talentScores: Array<{ talent: string; score: number }> = [];

  responses.forEach((r) => {
    if (r.choice === "like") {
      const card = STRENGTHS_CARDS.find((c) => c.id === r.cardId);
      const talentName = card?.talentKey || `Talent_${r.cardId}`;
      const sRt = sanitizeRT(r.rt, baselineRt);
      // Fast reaction (low RT) increases score multiplier
      const speedMultiplier = Math.max(0.1, baselineRt / Math.max(sRt, 100));
      talentScores.push({ talent: talentName, score: speedMultiplier });
    }
  });

  talentScores.sort((a, b) => b.score - a.score);

  return {
    topTalents: talentScores.slice(0, 5).map((t) => t.talent),
    reactionTimeBaselineMs: Math.round(baselineRt),
  };
}

function calculateJungian(
  imageDecoding: ImageDecodingResult[],
  resourceAllocations: ResourceAllocationResult[],
  bigFiveE: number,
  bigFiveC: number,
): JungianResult {
  let N_score = 0;
  let S_score = 0;
  let T_score = 0;
  let F_score = 0;

  imageDecoding.forEach((img) => {
    const sRt = sanitizeRT(img.rt, 2500);
    const weight = sRt < 2000 ? 1.5 : 1.0;

    // Inkblot images (e.g., card_1 to card_8)
    if (img.imageId.startsWith("card_")) {
      if (img.cognitiveBias === "N") N_score += weight;
      if (img.cognitiveBias === "S") S_score += weight;
    }

    // Cognitive questions (e.g., cog1 to cog6)
    if (img.imageId.startsWith("cog")) {
      const q = JUNGIAN_COGNITIVE_QUESTIONS.find((x) => x.id === img.imageId);
      if (!q) return;
      const opt = q.options.find((o) => o.id === img.selectedOption);
      if (!opt) return;

      if (opt.bias === "N") N_score += weight;
      if (opt.bias === "S") S_score += weight;

      if (opt.subBias === "T") T_score += weight;
      if (opt.subBias === "F") F_score += weight;
    }
  });

  const P_pref = N_score >= S_score ? "N" : "S";
  const J_pref = T_score >= F_score ? "T" : "F";
  const isExtravert = bigFiveE > 50;
  const isJudging = bigFiveC > 50;

  let dominant = "";
  let auxiliary = "";

  if (isExtravert) {
    if (isJudging) {
      dominant = J_pref + "e";
      auxiliary = P_pref + "i";
    } else {
      dominant = P_pref + "e";
      auxiliary = J_pref + "i";
    }
  } else {
    if (isJudging) {
      dominant = P_pref + "i";
      auxiliary = J_pref + "e";
    } else {
      dominant = J_pref + "i";
      auxiliary = P_pref + "e";
    }
  }

  const tertiaryPref =
    auxiliary.charAt(0) === "N"
      ? "S"
      : auxiliary.charAt(0) === "S"
        ? "N"
        : auxiliary.charAt(0) === "T"
          ? "F"
          : "T";
  const tertiary = tertiaryPref + (auxiliary.charAt(1) === "e" ? "i" : "e");
  const inferiorPref =
    dominant.charAt(0) === "N"
      ? "S"
      : dominant.charAt(0) === "S"
        ? "N"
        : dominant.charAt(0) === "T"
          ? "F"
          : "T";
  const inferior = inferiorPref + (dominant.charAt(1) === "e" ? "i" : "e");

  const confidence =
    Math.abs(N_score - S_score) < 0.5 || Math.abs(T_score - F_score) < 0.5
      ? "Low"
      : "High";

  return { primary: dominant, auxiliary, tertiary, inferior, confidence };
}

export function processAssessmentData(
  state: SerializableAssessmentState,
): ComprehensiveReport {
  const bigFive = calculateBigFive(state.bigFive.responses);
  const enneagram = calculateEnneagram(
    state.enneagram.responses,
    bigFive.scores.N,
  );
  const disc = calculateDiSC(
    state.disc.responses,
    state.jungian.resourceAllocation,
  );
  const strengths = calculateStrengths(state.strengths.responses);
  const jungian = calculateJungian(
    state.jungian.imageDecoding,
    state.jungian.resourceAllocation,
    bigFive.scores.E,
    bigFive.scores.C,
  );

  const warnings: string[] = [];

  // Attention Checks Validation
  let attentionFailedCount = 0;
  state.bigFive.responses.forEach((r) => {
    if (r.questionId === "att1" || r.questionId === "att3") {
      if (r.value > 15) {
        attentionFailedCount++;
      }
    } else if (r.questionId === "att2") {
      if (r.value < 85) {
        attentionFailedCount++;
      }
    }
  });

  if (attentionFailedCount > 0) {
    const attentionChecksPresent = state.bigFive.responses.filter(r => r.questionId.startsWith("att")).length;
    warnings.push(
      `注意力一致性校验未完全通过（失败次数: ${attentionFailedCount}/${attentionChecksPresent}），评估置信度受答题真实性或疲劳程度影响。`
    );
  }

  const consistencyCheck: Record<string, boolean> = {
    Extroversion_Alignment: true,
    Task_vs_People_Alignment: true,
  };

  const isHighE = bigFive.scores.E > 55;
  const isDiscExtroverted = disc.quadrant === "D" || disc.quadrant === "i";
  if (isHighE !== isDiscExtroverted) {
    consistencyCheck["Extroversion_Alignment"] = false;
    warnings.push(
      "大五外倾性与职场行为坐标轴存在背离，反映出生活与职场角色的能量差异。",
    );
  }

  // Task vs People Alignment Check
  const isBigFivePeople = bigFive.scores.A > bigFive.scores.C;
  const isDiscPeople = disc.vector.x > 0;
  if (isBigFivePeople !== isDiscPeople) {
    consistencyCheck["Task_vs_People_Alignment"] = false;
    warnings.push(
      "大五人际利他倾向与职场博弈决策风格（关注事 vs 关注人）存在偏差，可能反映出在公开场合与私下决策中的双重特质差异。",
    );
  }

  if (strengths.reactionTimeBaselineMs > 3000) {
    warnings.push(
      "反应时基线显著偏离常规(>3000ms)，评估置信度受环境噪音影响。",
    );
  }

  const discDesc = {
    D: "主导驱动型",
    i: "影响感召型",
    S: "稳定支持型",
    C: "谨慎分析型",
    Mixed: "均衡适应型",
  }[disc.quadrant];

  // RT Confidence: Ratio of valid responses to total responses across all modules
  const allRtResponses = [
    ...state.bigFive.responses.map((r) => ({ rt: r.rt })),
    ...state.enneagram.responses.map((r) => ({ rt: r.rt })),
    ...state.strengths.responses.map((r) => ({ rt: r.rt })),
    ...state.jungian.imageDecoding.map((r) => ({ rt: r.rt })),
  ];
  const totalQuestions = allRtResponses.length;
  const validQuestions = allRtResponses.filter(
    (q) => q.rt > RT_CONFIG.MIN_RT && q.rt < RT_CONFIG.MAX_RT,
  ).length;
  const rtConfidence = totalQuestions > 0 ? validQuestions / totalQuestions : 1;

  return {
    bigFive,
    enneagram,
    disc,
    strengths,
    jungian,
    synthesis: {
      corePattern: `该用户展现出${bigFive.scores.E > 50 ? "外向" : "内敛"}的特质，核心功能栈由${jungian.primary}主导。九型人格${enneagram.primaryType}w${enneagram.wing}勾勒出深层动机，在职场中表现为${discDesc}。`,
      consistencyCheck,
      warnings,
    },
    metadata: {
      calculatedAt: new Date().toISOString(),
      rtConfidence: parseFloat(rtConfidence.toFixed(2)),
      version: "1.2.0-clinical-validity",
      gear: state.gear || "full",
      career: state.career || "general",
      interest: state.interest || "lifestyle",
    },
  };
}
