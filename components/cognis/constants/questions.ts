import questionsData from "../../../public/data/questions.json";

// Type assertions to ensure strict type matching across components
export interface ModuleInfo {
  name: string;
  description: string;
  part: string;
}

export interface BigFiveQuestion {
  id: string;
  title: string;
  subtitle: string;
  lowAnchor: string;
  highAnchor: string;
  lowBehavior: string;
  highBehavior: string;
  dimension?: string;
  facet?: string;
  isReversed?: boolean;
  a?: number;
  b?: number;
}

export interface EnneagramOption {
  id: "a" | "b" | "c" | "d";
  text: string;
  scoring?: {
    type: number;
    instinct?: "SP" | "SX" | "SO";
  };
}

export interface EnneagramQuestion {
  id: string;
  scene: string;
  situation: string;
  question: string;
  options: EnneagramOption[];
  isStressTest?: boolean;
}

export interface DiSCOption {
  id: "a" | "b" | "c" | "d";
  text: string;
  vector: { x: number; y: number };
}

export interface DiSCMessage {
  sender: string;
  text: string;
  time: string;
}

export interface DiSCScenario {
  id: string;
  contact: string;
  messages: DiSCMessage[];
  trigger: string;
  options: DiSCOption[];
}

export interface StrengthsCard {
  id: string;
  word: string;
  hint: string;
  talentKey?: string;
}

export interface JungianImageOption {
  id: string;
  text: string;
  cognitiveBias: "N" | "S";
}

export interface JungianAllocationCategory {
  id: "rd" | "mkt" | "ops" | "hr";
  name: string;
  icon: string;
  allocation: number;
}

export interface JungianCognitiveOption {
  id: string;
  text: string;
  bias: "N" | "S";
  subBias: "T" | "F";
}

export interface JungianCognitiveQuestion {
  id: string;
  type: string;
  pair: string;
  scenario: string;
  options: JungianCognitiveOption[];
}

import { NARRATIVE_SCENARIOS } from "./narrative-questions";

export const MODULE_INFO: ModuleInfo[] = questionsData.MODULE_INFO as ModuleInfo[];

// Generate virtual Big Five questions from narrative scenarios
const virtualBigFiveQuestions: BigFiveQuestion[] = [];
NARRATIVE_SCENARIOS.forEach(scenario => {
  scenario.stages.forEach(stage => {
    stage.options.forEach(opt => {
      virtualBigFiveQuestions.push({
        id: `${stage.id}_bf_${opt.id}`,
        title: stage.title,
        subtitle: stage.situation,
        lowAnchor: "低倾向",
        highAnchor: "高倾向",
        lowBehavior: "",
        highBehavior: "",
        dimension: opt.scoring.bigFive.dimension,
        facet: opt.scoring.bigFive.facet,
        isReversed: opt.scoring.bigFive.isReversed ?? false,
        a: 1.0,
        b: 0.0
      });
    });
  });
});

export const BIG_FIVE_QUESTIONS = [
  ...(questionsData.BIG_FIVE_QUESTIONS as BigFiveQuestion[]),
  ...virtualBigFiveQuestions
];

// Generate virtual Enneagram questions from narrative scenarios
const virtualEnneagramQuestions: EnneagramQuestion[] = [];
NARRATIVE_SCENARIOS.forEach(scenario => {
  scenario.stages.forEach(stage => {
    virtualEnneagramQuestions.push({
      id: `${stage.id}_en`,
      scene: scenario.name,
      situation: stage.situation,
      question: stage.question,
      options: stage.options.map(opt => ({
        id: opt.id,
        text: opt.text,
        scoring: {
          type: opt.scoring.enneagram.type,
          instinct: opt.scoring.enneagram.instinct
        }
      }))
    });
  });
});

export const ENNEAGRAM_QUESTIONS = [
  ...(questionsData.ENNEAGRAM_QUESTIONS as EnneagramQuestion[]),
  ...virtualEnneagramQuestions
];

export const DISC_SCENARIOS = questionsData.DISC_SCENARIOS as DiSCScenario[];
export const STRENGTHS_CARDS = questionsData.STRENGTHS_CARDS as StrengthsCard[];
export const JUNGIAN_IMAGE_OPTIONS = questionsData.JUNGIAN_IMAGE_OPTIONS as JungianImageOption[];
export const JUNGIAN_ALLOCATION_CATEGORIES = questionsData.JUNGIAN_ALLOCATION_CATEGORIES as JungianAllocationCategory[];

// Generate virtual Jungian cognitive questions from narrative scenarios
const virtualJungianCognitiveQuestions: JungianCognitiveQuestion[] = [];
NARRATIVE_SCENARIOS.forEach(scenario => {
  scenario.stages.forEach(stage => {
    virtualJungianCognitiveQuestions.push({
      id: `cog_${stage.id}`,
      type: "cognitivePair",
      pair: "NT",
      scenario: stage.situation,
      options: stage.options.map(opt => ({
        id: opt.id,
        text: opt.text,
        bias: opt.scoring.jungian.bias,
        subBias: opt.scoring.jungian.subBias
      }))
    });
  });
});

export const JUNGIAN_COGNITIVE_QUESTIONS = [
  ...((questionsData as any).JUNGIAN_COGNITIVE_QUESTIONS as JungianCognitiveQuestion[]),
  ...virtualJungianCognitiveQuestions
];

// Seedable LCG randomizer for deterministic shuffling
function createRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = (Math.imul(31, h) + seedStr.charCodeAt(i)) | 0;
  }
  return function() {
    h = (h + 0x9e3779b9) | 0;
    let z = h;
    z ^= z >>> 16;
    z = Math.imul(z, 0x21f0aa7);
    z ^= z >>> 15;
    z = Math.imul(z, 0x735a2d97);
    z ^= z >>> 15;
    return (z >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: string): T[] {
  if (!seed) return arr;
  const rand = createRandom(seed);
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

function getQuestionScenarioGroup(qId: string): "tech" | "business" | "general" {
  const num = parseInt(qId.replace("bf", ""));
  if (isNaN(num)) return "general";
  if ((num >= 1 && num <= 60) || (num >= 181 && num <= 210)) return "tech";
  if ((num >= 61 && num <= 90) || (num >= 121 && num <= 150) || (num >= 211 && num <= 240)) return "business";
  return "general";
}

function getCategoryWeights(
  career: "tech" | "business" | "creative" | "finance" | "healthcare" | "legal" | "education" | "manufacturing" | "general",
  interest: "ai" | "finance" | "creative" | "lifestyle"
) {
  let tech = 0.33;
  let business = 0.33;
  let general = 0.34;

  if (career === "tech" || career === "healthcare" || career === "manufacturing") {
    tech = 0.55;
    general = 0.30;
    business = 0.15;
  } else if (career === "business" || career === "finance" || career === "legal") {
    business = 0.55;
    general = 0.30;
    tech = 0.15;
  } else if (career === "creative" || career === "education" || career === "general") {
    general = 0.55;
    tech = 0.25;
    business = 0.20;
  }

  // Adjust for interest
  if (interest === "ai") {
    tech += 0.15;
    business -= 0.075;
    general -= 0.075;
  } else if (interest === "finance" || interest === "creative") {
    business += 0.15;
    tech -= 0.075;
    general -= 0.075;
  } else if (interest === "lifestyle") {
    general += 0.15;
    tech -= 0.075;
    business -= 0.075;
  }

  const sum = tech + business + general;
  return {
    tech: Math.max(0.05, tech / sum),
    business: Math.max(0.05, business / sum),
    general: Math.max(0.05, general / sum),
  };
}

export function adaptQuestionToCareer(q: BigFiveQuestion, career: string): BigFiveQuestion {
  const adapted = { ...q };
  
  const templates: Record<string, { subtitle: string; replacements: Record<string, string> }> = {
    tech: {
      subtitle: "在云原生多租户架构发生概率性雪崩、核心大客户在线上发出退款通牒的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {}
    },
    business: {
      subtitle: "在公司核心业务线遭遇竞品饱和式价格战、大客户流失率飙升至警戒线的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {
        "战室": "紧急高管会议",
        "会诊室": "紧急高管会议",
        "排障": "危机公关",
        "代码": "运营策略",
        "流控逻辑": "运营策略",
        "数据库": "业务大盘",
        "系统底座": "业务大盘",
        "漏洞": "业务漏洞",
        "运维": "运营",
        "工程师": "运营经理"
      }
    },
    creative: {
      subtitle: "在核心设计方案被指控抄袭、发布会仅剩24小时且面临全网舆论危机的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {
        "战室": "创意工坊",
        "会诊室": "创意工坊",
        "排障": "方案重构",
        "代码": "视觉稿",
        "流控逻辑": "视觉稿",
        "数据库": "设计底稿",
        "系统底座": "设计底稿",
        "漏洞": "设计缺陷",
        "运维": "设计",
        "工程师": "设计师"
      }
    },
    finance: {
      subtitle: "在重仓持有的核心资产遭遇黑天鹅事件暴跌、面临爆仓清算与投资人集体挤兑的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {
        "战室": "交易大厅",
        "会诊室": "交易大厅",
        "排障": "资产重组",
        "代码": "对冲策略",
        "流控逻辑": "对冲策略",
        "数据库": "风控底线",
        "系统底座": "风控底线",
        "漏洞": "风控漏洞",
        "运维": "风控",
        "工程师": "交易员"
      }
    },
    healthcare: {
      subtitle: "在医院突发不明原因聚集性感染、重症监护室（ICU）床位告急且面临家属舆论风暴的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {
        "战室": "会诊中心",
        "会诊室": "会诊中心",
        "排障": "临床救治",
        "代码": "诊疗方案",
        "流控逻辑": "诊疗方案",
        "数据库": "医疗底线",
        "系统底座": "医疗底线",
        "漏洞": "诊疗漏洞",
        "运维": "医护",
        "工程师": "主治医生"
      }
    },
    legal: {
      subtitle: "在公司核心高管涉嫌刑事犯罪被捕、面临监管机构天价罚单与声誉彻底崩塌的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {
        "战室": "合规审查室",
        "会诊室": "合规审查室",
        "排障": "合规抗辩",
        "代码": "法律条款",
        "流控逻辑": "法律条款",
        "数据库": "合规底线",
        "系统底座": "合规底线",
        "漏洞": "合规漏洞",
        "运维": "法务",
        "工程师": "合规官"
      }
    },
    general: {
      subtitle: "在家庭突发重大财务危机、面临房贷断供与核心家庭成员重病住院的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {
        "战室": "家庭会议",
        "会诊室": "家庭会议",
        "排障": "危机应对",
        "代码": "家庭决策",
        "流控逻辑": "家庭决策",
        "数据库": "生活底线",
        "系统底座": "生活底线",
        "漏洞": "决策漏洞",
        "运维": "家人",
        "工程师": "家庭成员"
      }
    },
    education: {
      subtitle: "在学校突发重大教学事故、面临家长群舆论声讨与教育主管部门严厉约谈的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {
        "战室": "教研室",
        "会诊室": "教研室",
        "排障": "危机应对",
        "代码": "教学方案",
        "流控逻辑": "教学方案",
        "数据库": "教育底线",
        "系统底座": "教育底线",
        "漏洞": "教学漏洞",
        "运维": "教师",
        "工程师": "班主任"
      }
    },
    manufacturing: {
      subtitle: "在生产线突发重大设备故障停机、面临交期严重延误与核心客户天价索赔的生死关头，你倾向于：如果此时必须做出选择，你会：",
      replacements: {
        "战室": "中控室",
        "会诊室": "中控室",
        "排障": "设备抢修",
        "代码": "工艺流程",
        "流控逻辑": "工艺流程",
        "数据库": "生产底线",
        "系统底座": "生产底线",
        "漏洞": "工艺漏洞",
        "运维": "技术员",
        "工程师": "厂长"
      }
    }
  };

  const config = templates[career] || templates.general;
  adapted.subtitle = config.subtitle;

  const replaceKeywords = (text: string) => {
    let result = text;
    Object.entries(config.replacements).forEach(([key, val]) => {
      result = result.replaceAll(key, val);
    });
    return result;
  };

  adapted.lowBehavior = replaceKeywords(adapted.lowBehavior);
  adapted.highBehavior = replaceKeywords(adapted.highBehavior);

  return adapted;
}

export function getBigFiveQuestions(
  gear: "short" | "medium" | "full",
  career: "tech" | "business" | "creative" | "finance" | "healthcare" | "legal" | "education" | "manufacturing" | "general" = "general",
  interest: "ai" | "finance" | "creative" | "lifestyle" = "lifestyle",
  sessionId?: string | null
): BigFiveQuestion[] {
  const base = BIG_FIVE_QUESTIONS.filter(x => !x.id.startsWith("att") && !x.id.includes("_bf_"));
  const atts = BIG_FIVE_QUESTIONS.filter(x => x.id.startsWith("att"));

  const seed = sessionId || "";
  const rand = createRandom(seed);

  // Group base questions by dimension
  const dimMap: Record<string, BigFiveQuestion[]> = { O: [], C: [], E: [], A: [], N: [] };
  base.forEach(q => {
    if (q.dimension && dimMap[q.dimension]) {
      dimMap[q.dimension].push(q);
    }
  });

  // Determine target counts per dimension
  let targetCounts: Record<string, number>;
  if (gear === "short") {
    targetCounts = { O: 4, C: 4, E: 4, A: 4, N: 3 };
  } else if (gear === "medium") {
    targetCounts = { O: 12, C: 12, E: 11, A: 11, N: 11 };
  } else {
    targetCounts = { O: 48, C: 48, E: 48, A: 48, N: 48 };
  }

  const weights = getCategoryWeights(career, interest);

  // For each dimension, select questions using relevance scores with random jitter
  const selectedScored: BigFiveQuestion[] = [];
  Object.keys(dimMap).forEach(dim => {
    const list = dimMap[dim];
    const scoredList = list.map(q => {
      const cat = getQuestionScenarioGroup(q.id);
      const weight = weights[cat];
      const jitter = rand() * 0.1;
      return { q, score: weight + jitter };
    });

    scoredList.sort((a, b) => b.score - a.score);
    const count = targetCounts[dim];
    for (let i = 0; i < count && i < scoredList.length; i++) {
      selectedScored.push(adaptQuestionToCareer(scoredList[i].q, career));
    }
  });

  // Shuffle the selected scored questions deterministically
  let shuffledScored = seededShuffle(selectedScored, seed);

  // Distribute attention checks evenly in the shuffled list
  const finalQuestions: BigFiveQuestion[] = [];
  const att1 = atts.find(x => x.id === "att1");
  const att2 = atts.find(x => x.id === "att2");
  const att3 = atts.find(x => x.id === "att3");

  if (gear === "short") {
    // 19 scored + 1 check at index 10
    finalQuestions.push(...shuffledScored.slice(0, 10));
    if (att1) finalQuestions.push(att1);
    finalQuestions.push(...shuffledScored.slice(10));
  } else if (gear === "medium") {
    // 57 scored + 3 checks at indices 15, 30, 45
    finalQuestions.push(...shuffledScored.slice(0, 15));
    if (att1) finalQuestions.push(att1);
    finalQuestions.push(...shuffledScored.slice(15, 30));
    if (att2) finalQuestions.push(att2);
    finalQuestions.push(...shuffledScored.slice(30, 45));
    if (att3) finalQuestions.push(att3);
    finalQuestions.push(...shuffledScored.slice(45));
  } else {
    // 240 scored + 3 checks at indices 60, 140, 200
    finalQuestions.push(...shuffledScored.slice(0, 60));
    if (att1) finalQuestions.push(att1);
    finalQuestions.push(...shuffledScored.slice(60, 140));
    if (att2) finalQuestions.push(att2);
    finalQuestions.push(...shuffledScored.slice(140, 200));
    if (att3) finalQuestions.push(att3);
    finalQuestions.push(...shuffledScored.slice(200));
  }

  return finalQuestions;
}

export function getEnneagramQuestions(
  gear: "short" | "medium" | "full",
  sessionId?: string | null
): EnneagramQuestion[] {
  const baseQuestions = ENNEAGRAM_QUESTIONS.filter(q => !q.id.endsWith("_en"));
  let list: EnneagramQuestion[];
  if (gear === "short") {
    list = baseQuestions.filter((_, idx) => idx % 4 === 0).slice(0, 36);
  } else if (gear === "medium") {
    list = baseQuestions.filter((_, idx) => idx % 2 === 0).slice(0, 72);
  } else {
    list = baseQuestions.slice(0, 144);
  }
  return seededShuffle(list, sessionId || "");
}

export function getDiSCScenarios(
  gear: "short" | "medium" | "full",
  sessionId?: string | null
): DiSCScenario[] {
  let list: DiSCScenario[];
  if (gear === "short") {
    list = DISC_SCENARIOS.filter((_, idx) => idx % 4 === 0).slice(0, 20);
  } else if (gear === "medium") {
    list = DISC_SCENARIOS.filter((_, idx) => idx % 2 === 0).slice(0, 40);
  } else {
    list = DISC_SCENARIOS;
  }
  return seededShuffle(list, sessionId || "");
}

export function getStrengthsCards(
  gear: "short" | "medium" | "full",
  sessionId?: string | null
): StrengthsCard[] {
  let list: StrengthsCard[];
  if (gear === "short") {
    list = STRENGTHS_CARDS.slice(0, 50);
  } else if (gear === "medium") {
    list = STRENGTHS_CARDS.slice(0, 100);
  } else {
    list = STRENGTHS_CARDS;
  }
  return seededShuffle(list, sessionId || "");
}

export function getJungianImagesCount(gear: "short" | "medium" | "full"): number {
  if (gear === "short") return 4;
  if (gear === "medium") return 6;
  return 8;
}

export function getJungianCognitiveQuestions(
  gear: "short" | "medium" | "full",
  sessionId?: string | null
): JungianCognitiveQuestion[] {
  const baseQuestions = JUNGIAN_COGNITIVE_QUESTIONS.filter(q => !q.id.startsWith("cog_sc_"));
  let list: JungianCognitiveQuestion[];
  if (gear === "short") {
    list = baseQuestions.slice(0, 3);
  } else if (gear === "medium") {
    list = baseQuestions.slice(0, 4);
  } else {
    list = baseQuestions.slice(0, 6);
  }
  return seededShuffle(list, sessionId || "");
}
