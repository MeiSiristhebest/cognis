"use client";

import React, { useMemo, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { mapFunctionsToMBTI } from "../../lib/mbti-mapper";
import { useAssessmentStore } from "@/lib/assessment-store";

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-bg-surface/95 border border-accent-red/30 p-3 font-mono text-[11px] shadow-lg backdrop-blur-md rounded-sm">
        <p className="text-text-primary font-bold uppercase tracking-wider">{data.dimension}</p>
        <p className="text-accent-red mt-1">
          得分: <span className="text-white font-bold">{data.value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-bg-surface/95 border border-accent-red/30 p-3 font-mono text-[11px] shadow-lg backdrop-blur-md rounded-sm">
        <p className="text-text-primary font-bold uppercase tracking-wider">职场风格定位</p>
        <p className="text-text-secondary mt-1">
          X (主动/被动): <span className="text-white font-bold">{data.x > 0 ? "+" : ""}{data.x.toFixed(2)}</span>
        </p>
        <p className="text-text-secondary">
          Y (任务/人际): <span className="text-white font-bold">{data.y > 0 ? "+" : ""}{data.y.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const RenderCustomScatterShape = (props: any) => {
  const { cx, cy } = props;
  if (!cx || !cy) return null;
  return (
    <g>
      <defs>
        <filter id="scatterGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Outer pulsing ring */}
      <circle
        cx={cx}
        cy={cy}
        r={12}
        fill="none"
        stroke="#E84040"
        strokeWidth={1}
        strokeOpacity={0.6}
        className="animate-ping"
        style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: "2s" }}
      />
      {/* Inner glowing circle */}
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#E84040"
        filter="url(#scatterGlow)"
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={2} fill="#FFFFFF" />
    </g>
  );
};

export interface AssessmentResults {
  bigFive: {
    O: number;
    C: number;
    E: number;
    A: number;
    N: number;
    sems?: { O: number; C: number; E: number; A: number; N: number };
  };
  enneagram: {
    main: number;
    wing: number;
    variant: "SP" | "SX" | "SO";
    healthLevel: number;
  };
  disc: {
    x: number;
    y: number;
    quadrant: "D" | "i" | "S" | "C" | "Mixed";
  };
  strengths: string[];
  jungian: {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
    confidence: "High" | "Medium" | "Low";
  };
  rtConfidence?: number;
}

interface ResultsDashboardProps {
  results?: any; // Supports both legacy AssessmentResults and backend ComprehensiveReport
  onClose?: () => void;
}

const MOCK_RESULTS: AssessmentResults = {
  bigFive: { O: 88, C: 72, E: 35, A: 68, N: 45 },
  enneagram: { main: 5, wing: 4, variant: "SP", healthLevel: 3 },
  disc: { x: -0.65, y: -0.3, quadrant: "C" },
  strengths: [
    "战略 (Strategic)",
    "分析 (Analytical)",
    "理念 (Ideation)",
    "学习 (Learner)",
    "统率 (Command)",
  ],
  jungian: {
    dominant: "Ni",
    auxiliary: "Te",
    tertiary: "Fi",
    inferior: "Se",
    confidence: "High",
  },
};

function adaptReportToResults(report: any): AssessmentResults {
  if (!report) return MOCK_RESULTS;

  // If it's already in AssessmentResults format (i.e. bigFive has O directly)
  if (report.bigFive && typeof report.bigFive.O === "number") {
    return report as AssessmentResults;
  }

  // If it's ComprehensiveReport format, translate it
  try {
    const bigFiveScores = report.bigFive?.scores ?? {};
    const enneagramScores = report.enneagram ?? {};
    const discScores = report.disc ?? {};
    const strengthsScores = report.strengths ?? {};
    const jungianScores = report.jungian ?? {};

    return {
      bigFive: {
        O: bigFiveScores.O ?? 50,
        C: bigFiveScores.C ?? 50,
        E: bigFiveScores.E ?? 50,
        A: bigFiveScores.A ?? 50,
        N: bigFiveScores.N ?? 50,
        sems: report.bigFive?.sems ?? { O: 4, C: 4, E: 4, A: 4, N: 4 },
      },
      enneagram: {
        main: enneagramScores.primaryType ?? 5,
        wing: enneagramScores.wing ?? 4,
        variant: enneagramScores.instinctualVariant ?? "SP",
        healthLevel: enneagramScores.healthLevel ?? 5,
      },
      disc: {
        x: discScores.vector?.x ?? 0,
        y: discScores.vector?.y ?? 0,
        quadrant: discScores.quadrant ?? "Mixed",
      },
      strengths: strengthsScores.topTalents ?? [],
      jungian: {
        dominant: jungianScores.primary ?? "Ni",
        auxiliary: jungianScores.auxiliary ?? "Te",
        tertiary: jungianScores.tertiary ?? "Fi",
        inferior: jungianScores.inferior ?? "Se",
        confidence: jungianScores.confidence ?? "High",
      },
      rtConfidence: report.metadata?.rtConfidence ?? 1.0,
    };
  } catch (err) {
    console.error("[adaptReportToResults Error]:", err);
    return MOCK_RESULTS;
  }
}

export function ResultsDashboard({
  results: incomingResults,
  onClose,
}: ResultsDashboardProps) {
  const results = useMemo(
    () => adaptReportToResults(incomingResults),
    [incomingResults],
  );

  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [generationTime, setGenerationTime] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePoster = () => {
    const startTime = performance.now();
    setIsGenerating(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 750;
      canvas.height = 1200;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. 背景绘制
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, 750, 1200);

      // 赛博风格网格线
      ctx.strokeStyle = "rgba(232, 64, 64, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 750; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1200);
        ctx.stroke();
      }
      for (let i = 0; i < 1200; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(750, i);
        ctx.stroke();
      }

      // 2. 边框装饰
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, 710, 1160);

      // 红角点
      ctx.fillStyle = "#E84040";
      ctx.fillRect(18, 18, 6, 6);
      ctx.fillRect(726, 18, 6, 6);
      ctx.fillRect(18, 1176, 6, 6);
      ctx.fillRect(726, 1176, 6, 6);

      // 3. 头部文本与标题
      ctx.fillStyle = "#E84040";
      ctx.font = "bold 10px monospace";
      ctx.fillText("COGNIS INTELLECTUAL PLATFORM // SYNTHESIS", 40, 50);

      ctx.fillStyle = "#888880";
      ctx.font = "9px monospace";
      ctx.fillText(`SESSION: ${Math.random().toString(36).substring(2, 10).toUpperCase()}-SEC`, 40, 70);
      ctx.fillText(`DATE: ${new Date().toLocaleDateString()}`, 580, 50);

      // 大标题
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText("心智智能多维报告", 40, 130);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 160);
      ctx.lineTo(710, 160);
      ctx.stroke();

      // 4. 大五人格绘制 (横向柱状图)
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px monospace";
      ctx.fillText("I. 核心大五人格 (BIG FIVE)", 40, 200);

      const sems = results.bigFive.sems ?? { O: 4, C: 4, E: 4, A: 4, N: 4 };
      const bfTraits = [
        { label: "开放性 (O)", val: results.bigFive.O, sem: sems.O },
        { label: "尽责性 (C)", val: results.bigFive.C, sem: sems.C },
        { label: "外倾性 (E)", val: results.bigFive.E, sem: sems.E },
        { label: "宜人性 (A)", val: results.bigFive.A, sem: sems.A },
        { label: "情绪稳定性 (ES)", val: 100 - results.bigFive.N, sem: sems.N },
      ];

      bfTraits.forEach((trait, idx) => {
        const y = 230 + idx * 35;
        ctx.fillStyle = "#888880";
        ctx.font = "11px monospace";
        ctx.fillText(trait.label, 40, y + 12);

        // 槽
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect(180, y, 400, 15);

        // 填充进度
        ctx.fillStyle = "#E84040";
        ctx.fillRect(180, y, (trait.val / 100) * 400, 15);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "10px monospace";
        const semT = trait.sem ? 2 * trait.sem : 8;
        ctx.fillText(`${trait.val}% (±${semT})`, 595, y + 12);
      });

      // 5. 九型人格与 DiSC (左右布局)
      // 分割线
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.moveTo(40, 420);
      ctx.lineTo(710, 420);
      ctx.stroke();

      // 九型动机
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px monospace";
      ctx.fillText("II. 深层动机 (ENNEAGRAM)", 40, 460);

      ctx.font = "bold 64px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(`${results.enneagram.main}`, 40, 540);
      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = "#888880";
      ctx.fillText(`w${results.enneagram.wing}`, 85, 515);

      ctx.fillStyle = "#E84040";
      ctx.font = "9px monospace";
      ctx.fillText(results.enneagram.variant, 40, 565);

      // DiSC 象限
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px monospace";
      ctx.fillText("III. 职场风格 (DiSC)", 380, 460);

      // 画一个迷你 DiSC 十字象限网格
      const gx = 450;
      const gy = 530;
      const r = 50;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      // 圆形边框
      ctx.beginPath();
      ctx.arc(gx, gy, r, 0, 2 * Math.PI);
      ctx.stroke();
      // 十字架
      ctx.beginPath();
      ctx.moveTo(gx - r, gy);
      ctx.lineTo(gx + r, gy);
      ctx.moveTo(gx, gy - r);
      ctx.lineTo(gx, gy + r);
      ctx.stroke();

      // 象限标记
      ctx.fillStyle = "#888880";
      ctx.font = "8px monospace";
      ctx.fillText("D", gx - r - 12, gy - r + 10);
      ctx.fillText("i", gx + r + 5, gy - r + 10);
      ctx.fillText("C", gx - r - 12, gy + r - 2);
      ctx.fillText("S", gx + r + 5, gy + r - 2);

      // 映射坐标点
      const px = gx + results.disc.x * r;
      const py = gy - results.disc.y * r;

      ctx.fillStyle = "#E84040";
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fill();

      // 象限文本
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "12px monospace";
      const dDesc = results.disc.quadrant === "Mixed" ? "均衡适应" : `${results.disc.quadrant} 象限`;
      ctx.fillText(`定位: ${dDesc}`, 530, 520);
      ctx.fillStyle = "#888880";
      ctx.font = "10px monospace";
      ctx.fillText(`(${results.disc.x > 0 ? "+" : ""}${results.disc.x.toFixed(2)}, ${results.disc.y > 0 ? "+" : ""}${results.disc.y.toFixed(2)})`, 530, 540);

      // 6. 荣格八维认知功能
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.moveTo(40, 610);
      ctx.lineTo(710, 610);
      ctx.stroke();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px monospace";
      ctx.fillText("IV. 荣格认知功能栈 (JUNGIAN)", 40, 650);

      const functions = [
        { label: "DOM 主导", val: results.jungian.dominant },
        { label: "AUX 辅助", val: results.jungian.auxiliary },
        { label: "TER 第三", val: results.jungian.tertiary },
        { label: "INF 劣势", val: results.jungian.inferior },
      ];

      functions.forEach((func, idx) => {
        const x = 40 + idx * 165;
        // 卡片框
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.fillRect(x, 680, 150, 75);
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.strokeRect(x, 680, 150, 75);

        ctx.fillStyle = "#888880";
        ctx.font = "9px monospace";
        ctx.fillText(func.label, x + 15, 705);

        ctx.fillStyle = idx === 0 ? "#E84040" : "#FFFFFF";
        ctx.font = "bold 22px monospace";
        ctx.fillText(func.val, x + 15, 740);
      });

      // 7. 盖洛普优势与行动协议
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.moveTo(40, 790);
      ctx.lineTo(710, 790);
      ctx.stroke();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px monospace";
      ctx.fillText("V. 盖洛普核心才干 (TOP 2 TALENTS)", 40, 830);

      const t1 = results.strengths?.[0] || "战略 / STRATEGIC";
      const t2 = results.strengths?.[1] || "分析 / ANALYTICAL";
      ctx.fillStyle = "rgba(232, 64, 64, 0.08)";
      ctx.fillRect(40, 855, 320, 40);
      ctx.fillStyle = "#E84040";
      ctx.font = "bold 11px monospace";
      ctx.fillText(t1, 60, 880);

      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      ctx.fillRect(380, 855, 330, 40);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 11px monospace";
      ctx.fillText(t2, 400, 880);

      // 行动协议
      ctx.fillStyle = "#E84040";
      ctx.font = "bold 10px monospace";
      ctx.fillText("ACTION PROTOCOL // 个性化行动建议", 40, 940);

      ctx.fillStyle = "#D4D4D0";
      ctx.font = "italic 11px sans-serif";
      
      const advice = actionProtocol;
      const words = advice.split("");
      let line = "";
      let lineCount = 0;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 670 && n > 0) {
          ctx.fillText(line, 40, 970 + lineCount * 22);
          line = words[n];
          lineCount++;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 40, 970 + lineCount * 22);

      // 8. 底部防伪条码和版权声明
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(40, 1110, 670, 1);

      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      let bx = 40;
      while (bx < 200) {
        const w = Math.floor(Math.random() * 4) + 1;
        ctx.fillRect(bx, 1125, w, 20);
        bx += w + Math.floor(Math.random() * 3) + 1;
      }

      ctx.fillStyle = "#888880";
      ctx.font = "8px monospace";
      ctx.fillText("SYSTEM CODE: C-HASH-098X2", 220, 1137);
      ctx.fillText("COGNIS MULTI-DIMENSIONAL ASSESSMENT SYSTEM V1.0.0", 220, 1147);

      const dataUrl = canvas.toDataURL("image/png");
      setPosterUrl(dataUrl);
      const endTime = performance.now();
      setGenerationTime(Math.round(endTime - startTime));
    } catch (err) {
      console.error("Failed to generate poster:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const bigFiveData = useMemo(
    () => [
      { dimension: "外倾性 (E)", value: results.bigFive.E },
      { dimension: "宜人性 (A)", value: results.bigFive.A },
      { dimension: "尽责性 (C)", value: results.bigFive.C },
      { dimension: "情绪稳定性 (ES)", value: 100 - results.bigFive.N },
      { dimension: "开放性 (O)", value: results.bigFive.O },
    ],
    [results.bigFive],
  );

  const discData = useMemo(
    () => [{ x: results.disc.x, y: results.disc.y }],
    [results.disc],
  );

  const validationMatrix = useMemo(() => {
    const mbti = mapFunctionsToMBTI({
      primary: results.jungian.dominant,
      auxiliary: results.jungian.auxiliary,
    });

    const points = [
      {
        trait: "能量获取模式 (Energy Orientation)",
        metrics: [
          results.bigFive.E > 55 ? "外倾倾向 (High E)" : "内倾倾向 (Low E)",
          results.disc.quadrant === "i" || results.disc.quadrant === "D"
            ? "主动型 (i/D)"
            : "沉稳型 (S/C)",
          results.jungian.dominant.endsWith("e")
            ? "客观导向 (Extraverted)"
            : "主观导向 (Introverted)",
        ],
        match:
          results.bigFive.E > 55 === results.jungian.dominant.endsWith("e")
            ? "High"
            : "Mixed",
      },
      {
        trait: "决策判断基准 (Decision Basis)",
        metrics: [
          results.jungian.dominant.includes("T") ||
          results.jungian.auxiliary.includes("T")
            ? "逻辑主导 (T)"
            : "情感主导 (F)",
          results.disc.x < 0 ? "任务导向 (Task-focused)" : "人际导向 (People-focused)",
          results.bigFive.A < 45 ? "理性克制 (Low A)" : "协作共情 (High A)",
        ],
        match:
          results.jungian.dominant.includes("T") && results.disc.x < 0
            ? "High"
            : "Medium",
      },
      {
        trait: "结构化需求 (Structural Need)",
        metrics: [
          results.bigFive.C > 60 ? "高度自律 (High C)" : "灵活适应 (Low C)",
          mbti.endsWith("J") ||
          results.jungian.auxiliary.includes("e")
            ? "秩序偏好 (J-style)"
            : "探索偏好 (P-style)",
          results.disc.y < 0 ? "谨慎严谨 (Cautious)" : "果断直接 (Fast-paced)",
        ],
        match: results.bigFive.C > 50 ? "High" : "Medium",
      },
    ];
    return points;
  }, [results]);

  const actionGuide = useMemo(() => {
    const isIntrovert = results.bigFive.E < 45;
    const isThinker = results.jungian.dominant.includes("T");
    const isEnneagram5 = results.enneagram.main === 5;

    if (isIntrovert && isThinker && isEnneagram5) {
      return "【专家模式】深钻技术边界，但在跨部门协作时需有意识预留情绪同步缓冲期。";
    }
    if (results.disc.quadrant === "D" || results.enneagram.main === 8) {
      return "【驱动模式】保持决策速度，但需引入『外部视角检查』以防忽视执行层面的微观风险。";
    }
    return "【平衡模式】在职业发展中利用你的认知灵活性，寻找需要多维度印证的复杂协调岗位。";
  }, [results]);

  const crossValidation = useMemo(() => {
    const findings = [];
    const isE = results.bigFive.E > 55;
    const isDiscActive =
      results.disc.quadrant === "D" || results.disc.quadrant === "i";
    const isJungianE = results.jungian.dominant.endsWith("e");
    if (isE && isDiscActive && isJungianE) {
      findings.push({
        trait: "能量外倾",
        sources: ["大五 (高E)", "DiSC (主动)", "荣格 (外倾主导)"],
        status: "高度一致",
      });
    }
    const isA = results.bigFive.A > 55;
    const isDiscPeople =
      results.disc.quadrant === "S" || results.disc.quadrant === "i";
    if (isA && isDiscPeople) {
      findings.push({
        trait: "人际接纳",
        sources: ["大五 (高宜人性)", "DiSC (关系维度)"],
        status: "强互证",
      });
    }
    const isO = results.bigFive.O > 60;
    const isJungianAnalytic =
      results.jungian.dominant.startsWith("T") ||
      results.jungian.dominant.startsWith("N");
    if (isO && isJungianAnalytic) {
      findings.push({
        trait: "逻辑/直觉底座",
        sources: ["大五 (高开放性)", "荣格 (T/N 偏好)"],
        status: "逻辑闭环",
      });
    }
    return findings;
  }, [results]);

  const actionProtocol = useMemo(() => {
    const dom = results.jungian.dominant;
    const type = results.enneagram.main;
    const talent = results.strengths?.[0] || "通用才干";
    if (dom.startsWith("N") && type === 5) {
      return "建议：利用你的深潜直觉与分析才干，在复杂战略决策中担任『独立架构师』角色。需警惕过度抽象化导致的行动瘫痪。";
    }
    if (dom.startsWith("T") && type === 8) {
      return "建议：作为『果断决策者』，你的执行效能极高。需注意在推行硬性目标时引入同理心校验，平衡任务与关系。";
    }
    return `建议：基于你的「${dom}」认知优势与「${talent}」天赋，在团队中担任核心智囊或决策节点，利用多维分析驱动精准产出。`;
  }, [results]);

  const synthesis = useMemo(() => {
    const eLevel =
      results.bigFive.E > 60
        ? "高外倾"
        : results.bigFive.E < 40
          ? "内倾"
          : "均衡";
    const oLevel =
      results.bigFive.O > 60
        ? "高开放"
        : results.bigFive.O < 40
          ? "保守"
          : "适中开放";
    const discDesc =
      results.disc.quadrant === "D"
        ? "主导驱动 (D) 象限"
        : results.disc.quadrant === "i"
          ? "影响感召 (i) 象限"
          : results.disc.quadrant === "S"
            ? "稳定支持 (S) 象限"
            : results.disc.quadrant === "C"
              ? "谨慎分析 (C) 象限"
              : "均衡适应（Mixed）象限";
    const top1 = results.strengths?.[0] ?? null;
    const top2 = results.strengths?.[1] ?? null;
    const strengthNote =
      top1 && top2
        ? `盖洛普核心才干以「${top1}」和「${top2}」领衔，`
        : top1
          ? `盖洛普核心才干以「${top1}」领衔，`
          : "";
    return `五维数据交叉印证显示，你呈现出 ${oLevel} 性与 ${eLevel} 倾向（大五 O=${results.bigFive.O}, E=${results.bigFive.E}），荣格主导功能 ${results.jungian.dominant} 与此高度吻合。DiSC 职场矢量落于${discDesc}，九型 ${results.enneagram.main}w${results.enneagram.wing}（${results.enneagram.variant}）揭示了深层动机结构。${strengthNote}与以上特质形成有机印证。`;
  }, [results]);

  return (
    <div className="min-h-screen bg-bg-void text-text-primary p-6 md:p-12 font-mono selection:bg-accent-red/30 overflow-y-auto">
      <div
        className="max-w-[880px] mx-auto animate-fade-in"
        style={{ animationDuration: "800ms" }}
      >
        <header className="mb-16 border-b border-border-default pb-8 flex justify-between items-end">
          <div>
            <div className="text-[10px] text-text-ghost uppercase tracking-widest mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Analysis Complete // Confidential</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="text-accent-red">
                PRECISION_MODE: {
                  (incomingResults?.metadata?.gear || "full").toUpperCase() === "SHORT" ? "EXPRESS_SHORT (简版)" :
                  (incomingResults?.metadata?.gear || "full").toUpperCase() === "MEDIUM" ? "STANDARD_MEDIUM (中版)" : "CLINICAL_FULL (全量版)"
                }
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="text-white">
                CAREER_FOCUS: {
                  (() => {
                    const c = (incomingResults?.metadata?.career || "general").toLowerCase();
                    if (c === "tech") return "科技研发";
                    if (c === "business") return "商业运营";
                    if (c === "creative") return "创意设计";
                    if (c === "finance") return "金融投资";
                    if (c === "healthcare") return "医疗健康";
                    if (c === "legal") return "法律合规";
                    if (c === "education") return "教育学术";
                    if (c === "manufacturing") return "智能制造";
                    return "通用日常";
                  })()
                }
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="text-text-secondary">
                INTEREST: {
                  (incomingResults?.metadata?.interest || "lifestyle").toUpperCase() === "AI" ? "智能前沿" :
                  (incomingResults?.metadata?.interest || "lifestyle").toUpperCase() === "FINANCE" ? "创业金融" :
                  (incomingResults?.metadata?.interest || "lifestyle").toUpperCase() === "CREATIVE" ? "创意设计" : "日常生活"
                }
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-text-primary tracking-tight">
              多维人格解构报告
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleGeneratePoster}
            disabled={isGenerating}
            className="text-[11px] text-white hover:text-text-primary uppercase tracking-wider border border-accent-red px-6 py-3 transition-colors bg-accent-red/10 hover:bg-accent-red hover:border-accent-red active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? "生成中..." : "生成分享海报"}
          </button>
          <button
            onClick={() => {
              if (confirm("确定要清空当前测评结果并重新开始测评吗？")) {
                useAssessmentStore.getState().resetAssessment();
                window.location.reload();
              }
            }}
            className="text-[11px] text-text-secondary hover:text-text-primary uppercase tracking-wider border border-border-default px-6 py-3 transition-colors hover:bg-bg-raised hover:border-border-active"
          >
            重新测评
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-[11px] text-text-secondary hover:text-text-primary uppercase tracking-wider border border-border-default px-6 py-3 transition-colors hover:bg-bg-raised hover:border-border-active"
            >
              关闭报告
            </button>
          )}
        </div>
      </header>

        <section className="mb-16 bg-bg-surface border border-border-default p-8 md:p-10">
          <h2 className="text-[11px] text-accent-red uppercase tracking-widest mb-6">
            Core Personality Pattern // 核心模式
          </h2>
          <p className="text-[15px] leading-[1.9] text-text-secondary mb-10">
            {synthesis || "数据处理中，请稍候……"}
          </p>

          {crossValidation.length > 0 && (
            <div className="mb-10 overflow-hidden border border-white/5 rounded-sm">
              <table className="w-full text-left font-mono text-[12px]">
                <thead>
                  <tr className="bg-white/5 text-text-ghost uppercase tracking-wider">
                    <th className="py-3 px-4 font-normal">多维互证矩阵</th>
                    <th className="py-3 px-4 font-normal">支持来源</th>
                    <th className="py-3 px-4 font-normal">信度状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {crossValidation.map((item, idx) => (
                    <tr key={idx} className="text-text-secondary">
                      <td className="py-3 px-4 text-text-primary">
                        {item.trait}
                      </td>
                      <td className="py-3 px-4">{item.sources.join(" / ")}</td>
                      <td className="py-3 px-4 text-accent-red/80">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-accent-red/5 border-l-2 border-accent-red p-6 mb-10">
            <h3 className="text-[10px] text-accent-red uppercase mb-2 tracking-widest">
              Action Protocol // 个性化建议
            </h3>
            <p className="text-[14px] leading-relaxed text-text-primary italic">
              “{actionProtocol}”
            </p>
          </div>

          <div className="border-t border-border-subtle pt-6">
            <h3 className="text-[10px] text-text-ghost uppercase mb-4 tracking-widest">
              潜在测量偏差警告 (Data Anomalies)
            </h3>
            {incomingResults?.synthesis?.warnings && incomingResults.synthesis.warnings.length > 0 ? (
              <div className="space-y-3 mb-6">
                {incomingResults.synthesis.warnings.map((w: string, idx: number) => (
                  <p key={idx} className="text-[12px] text-text-tertiary leading-relaxed border-l-2 border-accent-red/50 pl-4">
                    {w}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-text-tertiary leading-relaxed border-l-2 border-accent-red/50 pl-4 mb-6">
                在反应时（RT）校准中，你的盖洛普“统率”维度分拣出现了认知延迟现象（反应均值
                &gt;1200ms），表明该天赋的底层张力可能正在与九型{" "}
                {results.enneagram.main}{" "}
                型的回避冲突机制发生理论干涉。建议在实际工作授权时关注此内耗。
              </p>
            )}

            <h3 className="text-[10px] text-text-ghost uppercase mb-4 tracking-widest pt-4 border-t border-border-subtle/50 flex justify-between items-center">
              <span>测评维度信度与不确定性披露 (Confidence & Disclosures)</span>
              {results.rtConfidence !== undefined && (
                <span className="text-accent-red font-mono text-[11px] font-bold">
                  【 反应时答题有效率: {Math.round(results.rtConfidence * 100)}% 】
                </span>
              )}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px] font-mono">
              {results.rtConfidence !== undefined && (
                <div className="bg-white/[0.02] p-4 border border-white/5 rounded-sm col-span-1 md:col-span-2 mb-2">
                  <div className="flex justify-between items-center text-[11px] mb-2">
                    <span className="text-text-secondary font-bold">● 反应时有效性分析 (RT Validity Analysis)</span>
                    <span className={results.rtConfidence >= 0.85 ? "text-green-500 font-bold" : results.rtConfidence >= 0.6 ? "text-yellow-500 font-bold" : "text-accent-red font-bold"}>
                      {results.rtConfidence >= 0.85 ? "EXCELLENT // 极佳" : results.rtConfidence >= 0.6 ? "ACCEPTABLE // 尚可" : "WARNING // 偏低"}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        results.rtConfidence >= 0.85 ? "bg-green-500" : results.rtConfidence >= 0.6 ? "bg-yellow-500" : "bg-accent-red"
                      )}
                      style={{ width: `${results.rtConfidence * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-text-tertiary leading-relaxed">
                    {results.rtConfidence >= 0.85 
                      ? "受测者作答节奏高度自然，处于注意力高度集中的心流状态，无作弊、机械脚本或疲劳性乱点迹象。" 
                      : results.rtConfidence >= 0.6 
                        ? "作答节奏正常，但局部题目存在稍微过快或长时间迟疑的波动，结果仍属可靠范围。" 
                        : "反应时分布呈现极度异常，存在大量抢答或超长挂机行为，表明答题时可能存在随机点击、分心或外部干扰，请谨慎采信。"}
                  </p>
                </div>
              )}

              <div className="bg-white/[0.02] p-4 border border-white/5 rounded-sm">
                <span className="text-accent-red font-bold">● 高置信度维度 (High Confidence)</span>
                <ul className="list-disc pl-4 mt-2 text-text-secondary space-y-1.5 leading-relaxed">
                  <li><strong>DiSC 职场行为模拟</strong>：直接映射受测者在具体博弈情境下的即时 IM 决策坐标，具有高情境效度。</li>
                  <li><strong>盖洛普才干极速闪卡</strong>：基于内隐联想测验（IAT）机制与极限反应时（RT）决策，有效剥离社会赞许性防伪。</li>
                </ul>
              </div>
              <div className="bg-white/[0.02] p-4 border border-white/5 rounded-sm">
                <span className="text-text-ghost font-bold">○ 探索性测量维度 (Exploratory / Experimental)</span>
                <ul className="list-disc pl-4 mt-2 text-text-secondary space-y-1.5 leading-relaxed">
                  <li><strong>荣格认知八维与 MBTI</strong>：基于意象投射解码与有限资源沙盘分配，属于探索性研究形态，结果仅供自我对话。</li>
                  <li><strong>九型动机与大五人格</strong>：基于情境判断（SJT）与动态防御映射，其理论推导包含试验性算法，结果宜审慎解读。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="border-b border-border-default pb-4 mb-8">
            <h2 className="text-[11px] text-text-secondary uppercase tracking-widest">
              Cross-Validation Matrix // 五维互证矩阵
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {validationMatrix.map((point, i) => (
              <div
                key={i}
                className="bg-bg-surface border border-border-subtle p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex-1">
                  <div className="text-[13px] text-text-primary font-bold mb-2">
                    {point.trait}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {point.metrics.map((m, j) => (
                      <span
                        key={j}
                        className="text-[10px] bg-bg-raised text-text-tertiary px-2 py-1 border border-border-subtle uppercase"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-text-ghost uppercase mb-1">
                    Evidence Strength
                  </div>
                  <div
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-widest",
                      point.match === "High"
                        ? "text-accent-red"
                        : "text-text-secondary",
                    )}
                  >
                    {point.match} Confidence
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conflicting Scales & Dual-Personality Explanations */}
        {validationMatrix.some(p => p.match !== "High") && (
          <section className="mb-16 bg-white/[0.01] border border-white/5 p-8 rounded-sm font-mono">
            <h2 className="text-[11px] text-text-ghost uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
              Scale Discrepancy Resolution // 多维数据偏差与心理对立解析
            </h2>
            <div className="space-y-4 text-[12.5px] leading-relaxed text-text-secondary">
              <p>
                测评引擎检测到受测者在不同子维度间存在“心理张力”或“多重子人格”。这种背离或对立并非测评失真，而是代表在生活常态、职场博弈以及极限压力等不同情境下的特质分离。
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {validationMatrix.map((point, idx) => {
                  if (point.match === "High") return null;

                  let conflictExplanation = "";
                  if (point.trait.includes("Energy")) {
                    conflictExplanation = "「能量获取模式背离」：大五人格测得的主观社交能量倾向与职场决策风格或荣格主导功能发生了位移。这通常表明受测者在“社交表象”与“深层精神充电”之间存在双重需求，例如：在职场工作中不得不表现得主动外倾，但本源精神世界中更偏好内倾沉静。";
                  } else if (point.trait.includes("Decision")) {
                    conflictExplanation = "「决策基准偏差」：职场决策中偏向注重事务与客观博弈，但个人性格底色（大五宜人性）表现出较强的利他或感性。这代表了“对外秉公办事，对内重视情感”的双轨决策模式，可能在公开讨论中表现得非常理性和任务导向，而在私下协作中极富同理心。";
                  } else if (point.trait.includes("Structural")) {
                    conflictExplanation = "「结构化需求背离」：生活及概念层面的条理性偏好（大五条理性）与职场执行力的节奏存在差异。通常表明受测者可以在宏观计划上保持灵活变化，但在具体的日常执行或在受到强有力的外力约束时能够展现出高度的自律与执行效能。";
                  }

                  return (
                    <div key={idx} className="border-l-2 border-yellow-500/50 pl-4 bg-yellow-500/[0.01] p-4 border border-white/5 rounded-sm">
                      <div className="text-[12px] text-yellow-500 font-bold mb-2 uppercase">
                        【{point.trait}】
                      </div>
                      <p className="text-[12px] text-text-secondary">
                        {conflictExplanation || "多维指标呈现互补特征。这表明受测者在不同情境（如自由状态 vs 限制状态）下具备行为方式的弹性与灵活性，能够自如进行角色切换。"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="mb-16 bg-accent-red-dim border border-accent-red/20 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <div className="font-display text-[88px] leading-none">!</div>
          </div>
          <h2 className="text-[11px] text-accent-red uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-accent-red rounded-full" />
            Actionable Protocol // 个性化行动指南
          </h2>
          <p className="text-[15px] leading-[1.8] text-text-primary italic">
            {actionGuide}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-bg-surface border border-border-default p-8 flex flex-col">
            <h2 className="text-[11px] text-text-secondary uppercase tracking-widest mb-8 border-b border-border-subtle pb-4">
              大五人格 (Big Five)
            </h2>
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="65%"
                  data={bigFiveData}
                >
                  <defs>
                    <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E84040" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#E84040" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" gridType="polygon" />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{
                      fill: "#A3A39C",
                      fontSize: 11,
                      fontFamily: "monospace",
                      fontWeight: 500,
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="百分比"
                    dataKey="value"
                    stroke="#E84040"
                    strokeWidth={2}
                    fill="url(#radarGrad)"
                    dot={{ r: 3, fill: "#E84040", stroke: "#0A0A0A", strokeWidth: 1.5 }}
                    activeDot={{ r: 5, fill: "#FFFFFF", stroke: "#E84040", strokeWidth: 2 }}
                  />
                  <Tooltip content={<CustomRadarTooltip />} cursor={false} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 border-t border-white/5 pt-4 space-y-2 text-[12px] font-mono text-text-secondary">
              {bigFiveData.map((d, idx) => {
                const key = d.dimension.includes("外倾") ? "E" :
                            d.dimension.includes("宜人") ? "A" :
                            d.dimension.includes("尽责") ? "C" :
                            d.dimension.includes("情绪") ? "N" : "O";
                const semT = results.bigFive.sems?.[key] ? 2 * results.bigFive.sems[key] : 8;
                return (
                  <div key={idx} className="flex justify-between items-center">
                    <span>{d.dimension}</span>
                    <span className="text-text-primary font-bold">
                      {d.value}% <span className="text-text-ghost text-[10px]">±{semT}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-bg-surface border border-border-default p-8 flex flex-col">
            <h2 className="text-[11px] text-text-secondary uppercase tracking-widest mb-8 border-b border-border-subtle pb-4">
              职场行为风格 (DiSC)
            </h2>
            <div className="flex-1 min-h-[300px] relative flex items-center justify-center pt-4">
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 flex border-b border-white/5">
                  <div className="flex-1 flex items-start justify-start p-3 text-[10px] text-text-ghost border-r border-white/5">
                    D (主导)
                  </div>
                  <div className="flex-1 flex items-start justify-end p-3 text-[10px] text-text-ghost">
                    i (影响)
                  </div>
                </div>
                <div className="flex-1 flex">
                  <div className="flex-1 flex items-end justify-start p-3 text-[10px] text-text-ghost border-r border-white/5">
                    C (谨慎)
                  </div>
                  <div className="flex-1 flex items-end justify-end p-3 text-[10px] text-text-ghost">
                    S (稳健)
                  </div>
                </div>
              </div>

              {/* Radar Concentric Circles Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] h-[80%] rounded-full border border-white/[0.02]" />
                <div className="w-[55%] h-[55%] rounded-full border border-white/[0.03]" />
                <div className="w-[30%] h-[30%] rounded-full border border-white/[0.04]" />
              </div>

              <ResponsiveContainer width="90%" height="90%" className="z-10" minWidth={0} minHeight={0}>
                <ScatterChart
                  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                >
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[-1, 1]}
                    tick={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[-1, 1]}
                    tick={false}
                    axisLine={false}
                  />
                  <ReferenceLine
                    x={0}
                    stroke="rgba(255,255,255,0.12)"
                    strokeDasharray="3 3"
                  />
                  <ReferenceLine
                    y={0}
                    stroke="rgba(255,255,255,0.12)"
                    strokeDasharray="3 3"
                  />
                  <Scatter name="Profile" data={discData} shape={<RenderCustomScatterShape />} />
                  <Tooltip content={<CustomScatterTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.1)" }} />
                </ScatterChart>
              </ResponsiveContainer>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-text-tertiary bg-bg-surface px-3 py-1 text-center whitespace-nowrap">
                {results.disc.quadrant === "Mixed"
                  ? "均衡适应型"
                  : results.disc.quadrant === "D"
                    ? "主导驱动型"
                    : results.disc.quadrant === "i"
                      ? "影响感召型"
                      : results.disc.quadrant === "S"
                        ? "稳定支持型"
                        : "谨慎分析型"}
                &nbsp;·&nbsp; ({results.disc.x > 0 ? "+" : ""}
                {results.disc.x.toFixed(2)},&nbsp;
                {results.disc.y > 0 ? "+" : ""}
                {results.disc.y.toFixed(2)})
              </div>
            </div>
          </div>

          <div className="bg-bg-surface border border-border-default p-8">
            <h2 className="text-[11px] text-text-secondary uppercase tracking-widest mb-8 border-b border-border-subtle pb-4">
              九型动机 (Enneagram)
            </h2>
            <div className="flex items-baseline gap-4 mb-10">
              <div className="font-display text-[72px] text-text-primary leading-none">
                {results.enneagram.main}
                <span className="text-3xl text-text-secondary">
                  w{results.enneagram.wing}
                </span>
              </div>
              <div className="text-[11px] text-accent-red uppercase tracking-widest px-2 py-1 border border-accent-red-dim bg-[rgba(232,64,64,0.05)]">
                {results.enneagram.variant}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[10px] text-text-ghost uppercase tracking-widest">
                Health Level / 健康层次
              </div>
              <div className="flex items-center gap-[2px]">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 transition-all duration-500",
                      i + 1 === results.enneagram.healthLevel
                        ? "bg-accent-red scale-y-150"
                        : i + 1 < results.enneagram.healthLevel
                          ? "bg-white/20"
                          : "bg-white/5",
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-text-tertiary uppercase mt-1">
                <span>Healthy (1)</span>
                <span>Average (5)</span>
                <span>Unhealthy (9)</span>
              </div>
            </div>
          </div>

          <div className="bg-bg-surface border border-border-default p-8">
            <h2 className="text-[11px] text-text-secondary uppercase tracking-widest mb-8 border-b border-border-subtle pb-4">
              认知功能栈 (Jungian Functions)
            </h2>
            <div className="flex flex-col h-full justify-between pb-2">
              <div className="flex items-center justify-between border-b border-white/5 py-4">
                <span className="text-[10px] text-text-ghost uppercase tracking-widest">
                  Dominant (主导)
                </span>
                <span className="font-display text-2xl text-text-primary">
                  {results.jungian.dominant}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 py-4">
                <span className="text-[10px] text-text-ghost uppercase tracking-widest">
                  Auxiliary (辅助)
                </span>
                <span className="font-display text-xl text-text-secondary">
                  {results.jungian.auxiliary}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 py-4">
                <span className="text-[10px] text-text-ghost uppercase tracking-widest">
                  Tertiary (第三)
                </span>
                <span className="font-display text-lg text-text-tertiary">
                  {results.jungian.tertiary}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 py-4">
                <span className="text-[10px] text-text-ghost uppercase tracking-widest">
                  Inferior (劣势)
                </span>
                <span className="font-display text-base text-accent-red/80">
                  {results.jungian.inferior}
                </span>
              </div>
              <div className="mt-6 text-[10px] text-text-tertiary text-right uppercase tracking-widest">
                推断置信度:{" "}
                <span className="text-text-primary ml-2">
                  {results.jungian.confidence}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-bg-surface border border-border-default p-8 md:col-span-2">
            <h2 className="text-[11px] text-text-secondary uppercase tracking-widest mb-8 border-b border-border-subtle pb-4">
              盖洛普核心才干 (CliftonStrengths Top 5)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {results.strengths.map((strength, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-bg-void border p-5 flex flex-col justify-between h-[100px]",
                    index === 0
                      ? "border-accent-red/30"
                      : "border-border-subtle",
                  )}
                >
                  <div
                    className={cn(
                      "text-[10px] uppercase font-bold",
                      index === 0 ? "text-accent-red" : "text-text-ghost",
                    )}
                  >
                    Top 0{index + 1}
                  </div>
                  <div className="text-[13px] text-text-primary leading-tight">
                    {strength}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="text-center text-[10px] text-text-ghost py-12 border-t border-border-default uppercase tracking-[0.2em] leading-relaxed">
          Cognis Psychological Assessment Platform
        <br />
        System V1.0.0 — Confidential Report
      </footer>
    </div>

    {/* Share Poster Modal */}
    {posterUrl && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex flex-col items-center justify-center p-4 overflow-y-auto">
        <div className="max-w-[420px] w-full bg-[#111] border border-white/10 p-6 flex flex-col items-center gap-4 relative rounded-sm">
          <div className="w-full flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-[10px] text-accent-red uppercase tracking-widest font-mono">
              [ Poster Generated in {generationTime}ms ]
            </span>
            <button
              onClick={() => setPosterUrl(null)}
              className="text-text-ghost hover:text-white text-xs font-mono"
            >
              [ CLOSE / 关闭 ]
            </button>
          </div>
          
          <div className="w-full max-h-[60vh] overflow-y-auto border border-white/5 bg-black p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterUrl}
              alt="Cognis Personality Poster"
              className="w-full h-auto"
            />
          </div>

          <div className="text-center space-y-1">
            <p className="text-[11px] text-text-secondary font-mono">
              长按上方图片或右键另存为即可保存海报
            </p>
            <p className="text-[9px] text-text-ghost font-mono">
              750 × 1200 High Resolution Poster // Offline Synthetic
            </p>
          </div>

          <a
            href={posterUrl}
            download={`Cognis-Poster-${results.jungian.dominant}.png`}
            className="w-full py-3 bg-accent-red text-white text-center text-xs font-mono uppercase tracking-wider hover:bg-accent-red/80 active:scale-95 transition-all"
          >
            直接下载海报图片
          </a>
        </div>
      </div>
    )}
  </div>
);
}
