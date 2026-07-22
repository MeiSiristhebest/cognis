"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAssessmentStore } from "@/lib/assessment-store";
import { saveAssessment } from "@/app/actions/assessment";
import { cn } from "@/lib/utils";
import {
  MODULE_INFO,
  BIG_FIVE_QUESTIONS,
  ENNEAGRAM_QUESTIONS,
  DISC_SCENARIOS,
  STRENGTHS_CARDS,
  JUNGIAN_IMAGE_OPTIONS,
  JUNGIAN_ALLOCATION_CATEGORIES,
  JUNGIAN_COGNITIVE_QUESTIONS,
  getBigFiveQuestions,
  getEnneagramQuestions,
  getDiSCScenarios,
  getStrengthsCards,
  getJungianImagesCount,
  getJungianCognitiveQuestions,
} from "./constants/questions";

import {
  BigFiveQuestion,
  EnneagramNarrativeQuestion,
  DiSCWorkplaceSimulation,
  StrengthsFlashcard,
  AmbiguousImageDecoding,
  ResourceAllocationDilemma,
  ResultsDashboard,
  ProgressBar,
  Typography,
  CognisButton,
  RTCalibrationWizard,
  NarrativeScenarioView,
} from "./index";

import { NARRATIVE_SCENARIOS } from "./constants/narrative-questions";

/**
 * ModuleTransition: Handles the cinematic intro for each assessment module
 */
function ModuleTransition({
  step,
  onComplete,
}: {
  step: number;
  onComplete: () => void;
}) {
  const info = MODULE_INFO[step];
  const [phase, setPhase] = useState<"in" | "active" | "out">("in");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("active"), 100),
      setTimeout(() => setPhase("out"), 2500),
      setTimeout(() => onComplete(), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-void overflow-hidden"
    >
      <div className="relative max-w-2xl w-full px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: phase === "in" ? 0.95 : phase === "active" ? 1 : 1.05,
            opacity: phase === "active" ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="mono"
            className="text-accent-red mb-4 block tracking-[0.2em] uppercase"
          >
            {info.part}
          </Typography>
          <Typography
            variant="h1"
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter"
          >
            {info.name}
          </Typography>
          <Typography
            variant="body"
            className="text-text-muted text-lg md:text-xl leading-relaxed"
          >
            {info.description}
          </Typography>
        </motion.div>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.05)_0%,transparent_70%)]" />
      </div>
    </motion.div>
  );
}

export function AssessmentShell() {
  const router = useRouter();
  const store = useAssessmentStore();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [viewingReport, setViewingReport] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const [bigFiveIdx, setBigFiveIdx] = useState(0);
  const [enneagramIdx, setEnneagramIdx] = useState(0);
  const [discIdx, setDiscIdx] = useState(0);
  const [calibrated, setCalibrated] = useState(false);
  const [qStartTime, setQStartTime] = useState<number>(0);

  const [cognitiveIdx, setCognitiveIdx] = useState(0);
  const [gearSelected, setGearSelected] = useState(false);
  const [selectedGear, setSelectedGear] = useState<"short" | "medium" | "full" | null>(null);

  const [selectedCareer, setSelectedCareer] = useState<"tech" | "business" | "creative" | "finance" | "healthcare" | "legal" | "education" | "manufacturing" | "general">("general");
  const [selectedInterest, setSelectedInterest] = useState<"ai" | "finance" | "creative" | "lifestyle">("lifestyle");

  useEffect(() => {
    if (store.step > 0 || store.bigFive.responses.length > 0) {
      setGearSelected(true);
    }
    if (store.gear) {
      setSelectedGear(store.gear as any);
    }
  }, [store.step, store.bigFive.responses, store.gear]);

  useEffect(() => {
    if (store.career) setSelectedCareer(store.career);
    if (store.interest) setSelectedInterest(store.interest);
  }, [store.career, store.interest]);

  const activeBigFiveQuestions = useMemo(() => getBigFiveQuestions(store.gear, store.career, store.interest, store.sessionId), [store.gear, store.career, store.interest, store.sessionId]);
  const activeEnneagramQuestions = useMemo(() => getEnneagramQuestions(store.gear, store.sessionId), [store.gear, store.sessionId]);
  const activeDiSCScenarios = useMemo(() => getDiSCScenarios(store.gear, store.sessionId), [store.gear, store.sessionId]);
  const activeStrengthsCards = useMemo(() => getStrengthsCards(store.gear, store.sessionId), [store.gear, store.sessionId]);
  const activeJungianImagesCount = useMemo(() => getJungianImagesCount(store.gear), [store.gear]);
  const activeJungianCognitiveQuestions = useMemo(() => getJungianCognitiveQuestions(store.gear, store.sessionId), [store.gear, store.sessionId]);

  const activeStep1Scenario = useMemo(() => {
    const career = store.career || "general";
    const interest = store.interest || "lifestyle";
    const seed = store.sessionId || "";
    
    // Simple deterministic hash (0 or 1) based on sessionId
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash + seed.charCodeAt(i)) % 2;
    }

    const isTechRoute = career === "tech" || career === "healthcare" || career === "manufacturing";
    const isBusinessRoute = career === "business" || career === "finance" || career === "legal";

    if (isTechRoute) {
      if (interest === "ai") {
        return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_b" : "sc_ab"))!;
      }
      if (interest === "finance") {
        return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_g" : "sc_aa"))!;
      }
      if (interest === "creative") {
        return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_h" : "sc_x"))!;
      }
      // lifestyle
      return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_q" : "sc_z"))!;
    }

    if (isBusinessRoute) {
      if (interest === "finance") {
        return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_c" : "sc_y"))!;
      }
      if (interest === "ai") {
        return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_b" : "sc_ab"))!;
      }
      if (interest === "creative") {
        return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_o" : "sc_u"))!;
      }
      // lifestyle
      return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_e" : "sc_n"))!;
    }

    // general & creative route
    if (interest === "lifestyle") {
      return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_e" : "sc_z"))!;
    }
    if (interest === "creative") {
      return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_f" : "sc_x"))!;
    }
    if (interest === "finance") {
      return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_g" : "sc_aa"))!;
    }
    // ai
    return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_j" : "sc_ab"))!;
  }, [store.career, store.interest, store.sessionId]);

  const activeStep2Scenario = useMemo(() => {
    const seed = store.sessionId || "";
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash + seed.charCodeAt(i)) % 2;
    }
    return NARRATIVE_SCENARIOS.find(s => s.id === (hash === 0 ? "sc_d" : "sc_s"))!;
  }, [store.sessionId]);

  const completedImagesCount = useMemo(() => {
    return store.jungian.imageDecoding.filter((img) =>
      img.imageId.startsWith("card_")
    ).length;
  }, [store.jungian.imageDecoding]);

  const completedCognitiveCount = useMemo(() => {
    return store.jungian.imageDecoding.filter((img) =>
      img.imageId.startsWith("cog")
    ).length;
  }, [store.jungian.imageDecoding]);

  const progress = useMemo(() => {
    const totalSteps = 5;
    const currentStepProgress = 0; // In a real app, this would be fine-grained per module
    return ((store.step + currentStepProgress) / totalSteps) * 100;
  }, [store.step]);

  useEffect(() => {
    setCognitiveIdx(completedCognitiveCount);
  }, [completedCognitiveCount]);

  useEffect(() => {
    setBigFiveIdx(0);
    setEnneagramIdx(0);
    setDiscIdx(0);
  }, [store.step]);

  useEffect(() => {
    setQStartTime(Date.now());
  }, [bigFiveIdx, enneagramIdx, store.step, cognitiveIdx, completedImagesCount]);

  // Auto-generate session ID if not exists (for checkpointing)
  useEffect(() => {
    if (!(store as any).sessionId) {
      const id = crypto.randomUUID();
      useAssessmentStore.setState({ sessionId: id } as any);
    }
  }, [store]);

  if (!gearSelected) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen flex flex-col justify-center items-center font-mono select-none text-white relative">
        <Typography variant="mono" className="text-accent-red uppercase tracking-[0.2em] text-xs mb-3 animate-pulse">
          // INITIALIZING COGNIS DEEP DIAGNOSTIC ENGINE
        </Typography>
        <Typography variant="h2" className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-2 text-white">
          选择你的测评场景与精度
        </Typography>
        <Typography variant="body" className="text-text-secondary text-xs md:text-sm text-center max-w-lg mb-8 leading-relaxed">
          系统将自动调节测试序列长度，并根据你的偏好智能调度关联情境，所有计算均在前端加密拟合。
        </Typography>

        {/* Preference Calibration Section */}
        <div className="w-full max-w-4xl mb-8 space-y-6 z-10 border border-white/5 bg-bg-surface/10 p-5 rounded-md backdrop-blur-sm">
          <div>
            <Typography variant="mono" className="text-accent-red text-xs uppercase tracking-widest block mb-1">
              // SECTION 01: SCENARIO CONTEXT CONFIGURATION (场景偏好设定)
            </Typography>
            <Typography variant="body" className="text-[11px] text-text-secondary">
              系统将根据你的偏好智能路由关联的职业两难情境（SJT），增强测试的情境化沉浸体验。
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Career Selector */}
            <div className="space-y-2">
              <span className="text-[10px] text-text-ghost uppercase tracking-wider block font-bold">1. 职业背景 / CAREER DOMAIN</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: "tech", label: "💻 科技研发", desc: "研发与开发" },
                  { id: "business", label: "💼 商业运营", desc: "商务与管理" },
                  { id: "creative", label: "🎨 创意设计", desc: "艺术与设计" },
                  { id: "finance", label: "📊 金融投资", desc: "投资与风控" },
                  { id: "healthcare", label: "🏥 医疗健康", desc: "医疗与护理" },
                  { id: "legal", label: "⚖️ 法律合规", desc: "法律与合规" },
                  { id: "education", label: "🏫 教育学术", desc: "教学与科研" },
                  { id: "manufacturing", label: "🏭 智能制造", desc: "工程与工艺" },
                  { id: "general", label: "🌍 通用日常", desc: "大众生活" }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCareer(item.id as any)}
                    className={cn(
                      "border p-2 rounded-sm cursor-pointer transition-all duration-200 text-center select-none font-mono flex flex-col justify-center min-h-[55px]",
                      selectedCareer === item.id
                        ? "border-accent-red bg-accent-red/10 text-white"
                        : "border-white/5 bg-black/20 text-text-secondary hover:border-white/20 hover:text-white"
                    )}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[8px] text-text-tertiary mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interest Selector */}
            <div className="space-y-2">
              <span className="text-[10px] text-text-ghost uppercase tracking-wider block font-bold">2. 兴趣倾向 / INTEREST FOCUS</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "ai", label: "🤖 智能前沿", desc: "AI 与新技术" },
                  { id: "finance", label: "📈 创业金融", desc: "商业与资本" },
                  { id: "creative", label: "🎨 创意设计", desc: "艺术与体验" },
                  { id: "lifestyle", label: "🏠 日常社交", desc: "生活与协作" }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedInterest(item.id as any)}
                    className={cn(
                      "border p-2 rounded-sm cursor-pointer transition-all duration-200 text-center select-none font-mono flex flex-col justify-center min-h-[55px]",
                      selectedInterest === item.id
                        ? "border-accent-red bg-accent-red/10 text-white"
                        : "border-white/5 bg-black/20 text-text-secondary hover:border-white/20 hover:text-white"
                    )}
                  >
                    <div className="text-[11px] font-bold">{item.label}</div>
                    <div className="text-[8px] text-text-tertiary mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mb-4">
          <Typography variant="mono" className="text-accent-red text-xs uppercase tracking-widest block mb-3">
            // SECTION 02: PRECISION MODE SELECTOR (测评精度选择)
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-10">
          {/* Short Gear */}
          <div 
            onClick={() => setSelectedGear("short")}
            className={cn(
              "border p-6 rounded-md cursor-pointer transition-all duration-300 flex flex-col justify-between group h-[270px]",
              selectedGear === "short"
                ? "border-accent-red bg-accent-red/5 shadow-[0_0_15px_rgba(232,64,64,0.15)]"
                : "border-white/5 bg-bg-surface/30 hover:border-accent-red/50 hover:bg-accent-red/5"
            )}
          >
            <div>
              <span className={cn(
                "text-[10px] uppercase tracking-widest block mb-4 transition-colors",
                selectedGear === "short" ? "text-accent-red" : "text-text-ghost group-hover:text-accent-red"
              )}>
                [ 简版 // EXPRESS_SHORT ]
              </span>
              <Typography variant="h3" className="text-xl font-bold mb-2 text-white">
                快速筛查模式
              </Typography>
              <Typography variant="body" className="text-xs text-text-tertiary leading-relaxed mb-4">
                提取核心行为倾向进行快速意向扫描，适合时间受限时的初步筛查。
              </Typography>
            </div>
            <div className="border-t border-white/5 pt-4 space-y-2 text-[10px] text-text-ghost uppercase">
              <div className="flex justify-between">
                <span>估计时长:</span> <span className="text-white">~3-5 分钟</span>
              </div>
              <div className="flex justify-between">
                <span>测量题量:</span> <span className="text-white">约 130 题/项</span>
              </div>
              <div className="flex justify-between">
                <span>置信系数:</span> <span className="text-yellow-600 font-bold">★☆☆☆☆ (LOW)</span>
              </div>
            </div>
          </div>

          {/* Medium Gear */}
          <div 
            onClick={() => setSelectedGear("medium")}
            className={cn(
              "border p-6 rounded-md cursor-pointer transition-all duration-300 flex flex-col justify-between group h-[270px]",
              selectedGear === "medium"
                ? "border-accent-red bg-accent-red/5 shadow-[0_0_15px_rgba(232,64,64,0.15)]"
                : "border-white/5 bg-bg-surface/30 hover:border-accent-red/50 hover:bg-accent-red/5"
            )}
          >
            <div>
              <span className={cn(
                "text-[10px] uppercase tracking-widest block mb-4 transition-colors",
                selectedGear === "medium" ? "text-accent-red" : "text-text-ghost group-hover:text-accent-red"
              )}>
                [ 中版 // STANDARD_MEDIUM ]
              </span>
              <Typography variant="h3" className="text-xl font-bold mb-2 text-white">
                团队适配模式
              </Typography>
              <Typography variant="body" className="text-xs text-text-tertiary leading-relaxed mb-4">
                标准常规招聘与团队协作分析，在精简时间的同时保留主要特质子维度的信度。
              </Typography>
            </div>
            <div className="border-t border-white/5 pt-4 space-y-2 text-[10px] text-text-ghost uppercase">
              <div className="flex justify-between">
                <span>估计时长:</span> <span className="text-white">~15-20 分钟</span>
              </div>
              <div className="flex justify-between">
                <span>测量题量:</span> <span className="text-white">约 280 题/项</span>
              </div>
              <div className="flex justify-between">
                <span>置信系数:</span> <span className="text-green-500 font-bold">★★★☆☆ (MEDIUM)</span>
              </div>
            </div>
          </div>

          {/* Full Gear */}
          <div 
            onClick={() => setSelectedGear("full")}
            className={cn(
              "border p-6 rounded-md cursor-pointer transition-all duration-300 flex flex-col justify-between group h-[270px] relative overflow-hidden",
              selectedGear === "full"
                ? "border-accent-red bg-accent-red/10 shadow-[0_0_20px_rgba(232,64,64,0.25)]"
                : "border-accent-red/20 bg-accent-red/5 hover:border-accent-red/80 hover:bg-accent-red/10"
            )}
          >
            <div className="absolute top-0 right-0 bg-accent-red text-white text-[8px] uppercase tracking-widest px-3 py-1 font-bold rounded-bl-sm">
              RECOMMENDED
            </div>
            <div>
              <span className="text-[10px] text-accent-red uppercase tracking-widest block mb-4">
                [ 全量版 // CLINICAL_FULL ]
              </span>
              <Typography variant="h3" className="text-xl font-bold mb-2 text-white">
                深度评鉴模式
              </Typography>
              <Typography variant="body" className="text-xs text-text-tertiary leading-relaxed mb-4">
                科研级与高管人才评鉴级精密度。精测 30 个大五特质面、九型三合会及完整防伪校验。
              </Typography>
            </div>
            <div className="border-t border-white/5 pt-4 space-y-2 text-[10px] text-text-ghost uppercase">
              <div className="flex justify-between">
                <span>估计时长:</span> <span className="text-white">~35-45 分钟</span>
              </div>
              <div className="flex justify-between">
                <span>测量题量:</span> <span className="text-white">约 660 题/项</span>
              </div>
              <div className="flex justify-between">
                <span>置信系数:</span> <span className="text-accent-red font-bold">★★★★★ (HIGH)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm & Start Button */}
        <AnimatePresence>
          {selectedGear && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl mt-12 flex flex-col items-center z-10"
            >
              <button
                onClick={() => {
                  store.setPreferences(selectedCareer, selectedInterest);
                  store.setGear(selectedGear);
                  setGearSelected(true);
                }}
                className="group relative flex items-center justify-center w-full md:w-[320px] h-16 border-2 border-accent-red bg-accent-red/10 hover:bg-accent-red transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(232,64,64,0.2)] hover:shadow-[0_0_30px_rgba(232,64,64,0.4)]"
              >
                <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-white font-bold group-hover:scale-105 transition-transform">
                  Initiate Protocol // 开启解构
                </span>
                {/* Corner brackets for brutalist look */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />
              </button>
              <span className="text-[9px] text-text-ghost uppercase tracking-widest mt-3 animate-pulse">
                [ SECURE FRONTEND CALIBRATION READY // 点击上方按钮开始 ]
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(232,64,64,0.02)_0%,transparent_60%)] pointer-events-none" />
      </div>
    );
  }

  if (!calibrated) {
    return (
      <RTCalibrationWizard
        onComplete={(baseRt) => {
          store.setPhysicalRtBaseMs(baseRt);
          setCalibrated(true);
        }}
      />
    );
  }

  // Handle Incremental Saving
  const handleCheckpoint = async (isFinal: boolean = false) => {
    setIsSaving(true);
    try {
      const state = useAssessmentStore.getState();
      
      // Extract only serializable data to prevent RSC serialization errors with functions
      const serializableState = {
        sessionId: state.sessionId,
        step: state.step,
        physicalRtBaseMs: state.physicalRtBaseMs,
        gear: state.gear,
        career: state.career,
        interest: state.interest,
        bigFive: state.bigFive,
        enneagram: state.enneagram,
        disc: state.disc,
        strengths: state.strengths,
        jungian: state.jungian,
      };

      const result = await saveAssessment(serializableState, isFinal);
      if (result.success && result.report) {
        setReportData(result.report);
      }
    } catch (err) {
      console.error("Checkpoint failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleModuleComplete = async () => {
    // Checkpoint progress to DB
    await handleCheckpoint(false);

    if (store.step < 4) {
      store.nextStep();
      setIsTransitioning(true);
    } else {
      // Final submission
      await handleCheckpoint(true);
      setViewingReport(true);
    }
  };

  const handleNarrativeComplete = async (
    scenarioResponses: Array<{ stageId: string; option: any; rt: number }>
  ) => {
    scenarioResponses.forEach((r) => {
      const { stageId, option, rt } = r;
      
      // 1. Save Big Five response
      store.setBigFiveResponse(`${stageId}_bf_${option.id}`, option.scoring.bigFive.value, rt);
      
      // 2. Save Enneagram response
      store.setEnneagramResponse(`${stageId}_en`, option.id, rt);
      
      // 3. Save DiSC response
      store.setDiSCResponse(`${stageId}_disc`, option.scoring.disc);
      
      // 4. Save Jungian response
      store.addImageDecoding(`cog_${stageId}`, option.id, option.scoring.jungian.bias, rt);
    });

    // Proceed to next step
    await handleModuleComplete();
  };

  const mappedMessages = useMemo(() => {
    if (!activeDiSCScenarios[discIdx]) return [];
    const scenario = activeDiSCScenarios[discIdx];
    const msgs = scenario.messages.map((m, idx) => ({
      sender: m.sender,
      text: m.text,
      delay: idx === 0 ? 500 : 1000,
      isSelf: m.sender === "你" || m.sender === "Me",
      isTrigger: false,
    }));
    msgs.push({
      sender: scenario.contact,
      text: scenario.trigger,
      delay: 1200,
      isSelf: false,
      isTrigger: true,
    });
    return msgs;
  }, [activeDiSCScenarios, discIdx]);

  if (viewingReport && reportData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 md:p-8"
      >
        <ResultsDashboard results={reportData} />
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen flex flex-col relative">
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <ModuleTransition
            key={`transition-${store.step}`}
            step={store.step}
            onComplete={() => setIsTransitioning(false)}
          />
        ) : (
          <motion.div
            key={`module-${store.step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col"
          >
            {/* Header / Progress Section */}
            <div className="mb-12 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <Typography
                    variant="mono"
                    className="text-accent-red uppercase tracking-widest text-xs mb-1"
                  >
                    Cognis Assessment System // v1.1
                  </Typography>
                  <Typography
                    variant="h2"
                    className="text-3xl font-bold text-white"
                  >
                    {MODULE_INFO[store.step].name}
                  </Typography>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Typography variant="mono" className="text-text-muted text-sm">
                    {Math.round(progress)}% COMPLETE
                  </Typography>
                  <button
                    onClick={() => {
                      if (confirm("确定要放弃当前进度并重新选择模式吗？")) {
                        store.resetAssessment();
                        window.location.reload();
                      }
                    }}
                    className="text-[10px] text-text-ghost hover:text-accent-red uppercase tracking-wider border border-white/5 hover:border-accent-red/30 px-2 py-1 transition-colors bg-black/20"
                  >
                    [ 重新选择模式 // RESET ]
                  </button>
                </div>
              </div>
              <ProgressBar progress={progress} />
            </div>

            {/* Dynamic Module Content */}
            <div className="flex-1">
              {store.step === 0 && activeBigFiveQuestions.length > 0 && (
                <BigFiveQuestion
                  scenarioHeadline={activeBigFiveQuestions[bigFiveIdx].title}
                  subText={activeBigFiveQuestions[bigFiveIdx].subtitle}
                  leftAnchor={activeBigFiveQuestions[bigFiveIdx].lowAnchor}
                  rightAnchor={activeBigFiveQuestions[bigFiveIdx].highAnchor}
                  leftBehavior={activeBigFiveQuestions[bigFiveIdx].lowBehavior}
                  rightBehavior={activeBigFiveQuestions[bigFiveIdx].highBehavior}
                  dimensionLabel={activeBigFiveQuestions[bigFiveIdx].dimension || ""}
                  progress={(bigFiveIdx + 1) / activeBigFiveQuestions.length}
                  onValueChange={() => {}}
                  onNext={async (val) => {
                    const rt = Date.now() - qStartTime;
                    store.setBigFiveResponse(activeBigFiveQuestions[bigFiveIdx].id, val, rt);
                    if (bigFiveIdx < activeBigFiveQuestions.length - 1) {
                      setBigFiveIdx((prev) => prev + 1);
                    } else {
                      await handleModuleComplete();
                    }
                  }}
                />
              )}

              {store.step === 1 && activeEnneagramQuestions.length > 0 && (
                <EnneagramNarrativeQuestion
                  scenarioLocation={activeEnneagramQuestions[enneagramIdx].scene}
                  situationText={activeEnneagramQuestions[enneagramIdx].situation}
                  questionPrompt={activeEnneagramQuestions[enneagramIdx].question}
                  options={activeEnneagramQuestions[enneagramIdx].options}
                  isStressTest={activeEnneagramQuestions[enneagramIdx].isStressTest}
                  progress={(enneagramIdx + 1) / activeEnneagramQuestions.length}
                  onSelect={async (optId) => {
                    const rt = Date.now() - qStartTime;
                    store.setEnneagramResponse(activeEnneagramQuestions[enneagramIdx].id, optId as any, rt);
                    if (enneagramIdx < activeEnneagramQuestions.length - 1) {
                      setEnneagramIdx((prev) => prev + 1);
                    } else {
                      await handleModuleComplete();
                    }
                  }}
                />
              )}

              {store.step === 2 && activeDiSCScenarios.length > 0 && (
                <DiSCWorkplaceSimulation
                  channelName={activeDiSCScenarios[discIdx].contact}
                  messages={mappedMessages}
                  responseOptions={activeDiSCScenarios[discIdx].options}
                  onResponse={async (optId) => {
                    const scenario = activeDiSCScenarios[discIdx];
                    const opt = scenario.options.find(o => o.id === optId);
                    if (opt) {
                      store.setDiSCResponse(scenario.id, opt.vector);
                    }
                    if (discIdx < activeDiSCScenarios.length - 1) {
                      setDiscIdx((prev) => prev + 1);
                    } else {
                      await handleModuleComplete();
                    }
                  }}
                />
              )}

              {store.step === 3 && (
                <div className="flex flex-col items-center justify-center min-h-[500px]">
                  <StrengthsFlashcard
                    cards={activeStrengthsCards}
                    onComplete={async (data) => {
                      data.selections.forEach((s) => {
                        store.addStrengthsResponse(s.cardId, s.choice, s.rt);
                      });
                      await handleModuleComplete();
                    }}
                  />
                  <Typography
                    variant="mono"
                    className="mt-8 text-text-muted text-xs uppercase tracking-tighter"
                  >
                    [ 快速直觉反应模式已开启 ]
                  </Typography>
                </div>
              )}

              {store.step === 4 && (
                <div className="space-y-12">
                  {completedImagesCount < activeJungianImagesCount && (
                    <section className="space-y-6">
                      <div className="flex justify-between items-center">
                        <Typography
                          variant="h3"
                          className="text-white flex items-center gap-3"
                        >
                          <span className="w-8 h-8 rounded-full bg-accent-red/20 text-accent-red flex items-center justify-center text-sm font-mono">
                            A
                          </span>
                          视觉认知投射 // VISUAL_PROJECTION
                        </Typography>
                        <Typography variant="mono" className="text-text-muted text-xs">
                          已解锁: {completedImagesCount} / {activeJungianImagesCount}
                        </Typography>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: activeJungianImagesCount }).map((_, idx) => {
                          const cardId = `card_${idx + 1}`;
                          const cardOptions = JUNGIAN_IMAGE_OPTIONS.slice(
                            idx * 8,
                            (idx + 1) * 8,
                          );
                          return (
                            <AmbiguousImageDecoding
                              key={cardId}
                              imageId={cardId}
                              imageUrl={`/images/cognis/inkblot-${idx + 1}.webp`}
                              options={cardOptions as any}
                              onSelect={(imageId, optId, bias, rt) =>
                                store.addImageDecoding(imageId, optId, bias, rt)
                              }
                            />
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {completedImagesCount >= activeJungianImagesCount && completedCognitiveCount < activeJungianCognitiveQuestions.length && (
                    <section className="space-y-6 animate-fadeIn">
                      <Typography
                        variant="h3"
                        className="text-white flex items-center gap-3"
                      >
                        <span className="w-8 h-8 rounded-full bg-accent-red/20 text-accent-red flex items-center justify-center text-sm font-mono">
                          B
                        </span>
                        认知倾向自效能分析 // COGNITIVE_ANALYSIS
                      </Typography>
                      {cognitiveIdx < activeJungianCognitiveQuestions.length && (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeJungianCognitiveQuestions[cognitiveIdx].id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="border border-white/5 bg-bg-surface/30 p-8 rounded-md relative overflow-hidden font-mono select-none space-y-6"
                          >
                            <div className="flex justify-between items-center border-b border-white/5 pb-4 text-xs text-text-ghost uppercase">
                              <span>认知倾向测定 // COGNITIVE ALIGNMENT</span>
                              <span className="text-accent-red">
                                QUESTION {cognitiveIdx + 1} OF {activeJungianCognitiveQuestions.length}
                              </span>
                            </div>

                            <div className="py-4">
                              <Typography
                                variant="body"
                                className="text-white text-lg leading-relaxed"
                              >
                                {activeJungianCognitiveQuestions[cognitiveIdx].scenario}
                              </Typography>
                            </div>

                            <div className="flex flex-col gap-3 pt-2">
                              {activeJungianCognitiveQuestions[cognitiveIdx].options.map(
                                (opt) => (
                                  <button
                                    key={opt.id}
                                    onClick={() => {
                                      const rt = Date.now() - qStartTime;
                                      store.addImageDecoding(
                                        activeJungianCognitiveQuestions[cognitiveIdx].id,
                                        opt.id,
                                        opt.bias,
                                        rt,
                                      );
                                      if (cognitiveIdx < activeJungianCognitiveQuestions.length - 1) {
                                        setCognitiveIdx((prev) => prev + 1);
                                      }
                                    }}
                                    className="w-full text-left text-sm py-4 px-6 border border-white/5 bg-black/20 hover:bg-white/5 hover:border-white/20 text-text-secondary hover:text-white transition-all duration-200 rounded-sm"
                                  >
                                    <span className="text-accent-red mr-3">
                                      [{opt.id.toUpperCase()}]
                                    </span>{" "}
                                    {opt.text}
                                  </button>
                                ),
                              )}
                            </div>

                            <div className="flex justify-between items-center text-[10px] text-text-ghost pt-4 border-t border-white/5">
                              <span>SYSTEM: DUAL_PROCESS_ANALYZER_V1</span>
                              <span>STATUS: WAITING_FOR_INPUT</span>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </section>
                  )}

                  {completedImagesCount >= activeJungianImagesCount && completedCognitiveCount >= activeJungianCognitiveQuestions.length && (
                    <section className="space-y-6 animate-fadeIn">
                      <Typography
                        variant="h3"
                        className="text-white flex items-center gap-3"
                      >
                        <span className="w-8 h-8 rounded-full bg-accent-red/20 text-accent-red flex items-center justify-center text-sm font-mono">
                          C
                        </span>
                        有限资源分配模拟 // STRATEGIC_ALLOCATION
                      </Typography>
                      <ResourceAllocationDilemma
                        taskId="org_prio_1"
                        title="组织发展优先级分配"
                        description="假设你是一家科技公司的创始人，目前拥有一笔核心预算。请根据你的价值观分配资源比例。"
                        categories={JUNGIAN_ALLOCATION_CATEGORIES}
                        onComplete={(taskId, allocs) => {
                          store.addResourceAllocation(taskId, allocs, [], {}, 0);
                          handleModuleComplete();
                        }}
                      />
                    </section>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Status Bar */}
      {!isTransitioning && (
        <footer className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className={`w-2 h-2 rounded-full ${isSaving ? "bg-accent-red animate-pulse" : "bg-green-500"}`}
            />
            <Typography
              variant="mono"
              className="text-[10px] text-text-muted uppercase"
            >
              {isSaving ? "ENC-SYNC-IN-PROGRESS" : "SYSTEM-READY-STANDBY"}
            </Typography>
          </div>
          <Typography variant="mono" className="text-[10px] text-text-muted">
            SESSION_ID: {((store as any).sessionId || "PENDING").slice(0, 8)}
          </Typography>
        </footer>
      )}
    </div>
  );
}
