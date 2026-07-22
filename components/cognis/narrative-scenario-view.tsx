"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, CognisButton } from "./index";
import { NarrativeScenario, NarrativeStage, NarrativeOption } from "./constants/narrative-questions";

interface NarrativeScenarioViewProps {
  scenario: NarrativeScenario;
  onComplete: (
    responses: Array<{
      stageId: string;
      option: NarrativeOption;
      rt: number;
    }>
  ) => void;
  isSaving?: boolean;
}

export function NarrativeScenarioView({
  scenario,
  onComplete,
  isSaving = false,
}: NarrativeScenarioViewProps) {
  const [stageIdx, setStageIdx] = useState<number>(-1); // -1 means intro screen
  const [responses, setResponses] = useState<
    Array<{ stageId: string; option: NarrativeOption; rt: number }>
  >([]);
  const [stageStartTime, setStageStartTime] = useState<number>(0);

  useEffect(() => {
    if (stageIdx >= 0 && stageIdx < scenario.stages.length) {
      setStageStartTime(Date.now());
    }
  }, [stageIdx, scenario.stages.length]);

  const handleStart = () => {
    setStageIdx(0);
  };

  const handleSelectOption = (option: NarrativeOption) => {
    const rt = Date.now() - stageStartTime;
    const currentStage = scenario.stages[stageIdx];
    
    const newResponses = [
      ...responses,
      {
        stageId: currentStage.id,
        option,
        rt,
      },
    ];
    
    setResponses(newResponses);

    if (stageIdx < scenario.stages.length - 1) {
      setStageIdx((prev) => prev + 1);
    } else {
      // All stages completed
      onComplete(newResponses);
    }
  };

  const currentStage: NarrativeStage | undefined = scenario.stages[stageIdx];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {stageIdx === -1 ? (
          // Intro Screen
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="border border-white/5 bg-bg-surface/30 p-8 md:p-12 rounded-md text-center space-y-8 relative overflow-hidden"
          >
            <div className="space-y-4">
              <Typography
                variant="mono"
                className="text-accent-red uppercase tracking-[0.2em] text-xs block"
              >
                // NARRATIVE SCENARIO // {scenario.id.toUpperCase()}
              </Typography>
              <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {scenario.name}
              </Typography>
              <Typography variant="body" className="text-text-secondary text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                {scenario.description}
              </Typography>
            </div>

            <div className="border-t border-white/5 pt-8 max-w-md mx-auto space-y-4 text-xs text-text-ghost uppercase font-mono">
              <div className="flex justify-between">
                <span>剧情阶段:</span> <span className="text-white">{scenario.stages.length} STAGES</span>
              </div>
              <div className="flex justify-between">
                <span>测量维度:</span> <span className="text-white">多维动力学拟合 (FFM / 荣格 / 弗洛伊德)</span>
              </div>
              <div className="flex justify-between">
                <span>决策模式:</span> <span className="text-white">沉浸式情境判断 (SJT)</span>
              </div>
            </div>

            <div className="pt-4">
              <CognisButton onClick={handleStart} className="px-8">
                进入场景叙事
              </CognisButton>
            </div>

            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.03)_0%,transparent_70%)] pointer-events-none" />
          </motion.div>
        ) : currentStage ? (
          // Active Stage Screen
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="border border-white/5 bg-bg-surface/30 p-6 md:p-10 rounded-md relative overflow-hidden font-mono select-none space-y-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 text-xs text-text-ghost uppercase">
              <span>{scenario.name}</span>
              <span className="text-accent-red">
                STAGE {stageIdx + 1} OF {scenario.stages.length}
              </span>
            </div>

            {/* Situation Description */}
            <div className="space-y-4">
              <Typography
                variant="mono"
                className="text-accent-red text-xs uppercase tracking-widest block"
              >
                // {currentStage.title.toUpperCase()}
              </Typography>
              <Typography
                variant="body"
                className="text-white text-base md:text-lg leading-relaxed bg-black/20 p-5 rounded-sm border border-white/5"
              >
                {currentStage.situation}
              </Typography>
            </div>

            {/* Question Prompt */}
            <div className="space-y-2">
              <span className="text-[10px] text-text-ghost uppercase tracking-wider block font-bold">
                // DECISION PROMPT (决策提问)
              </span>
              <Typography
                variant="h3"
                className="text-white text-lg md:text-xl font-bold tracking-tight"
              >
                {currentStage.question}
              </Typography>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-4 pt-2">
              {currentStage.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left text-sm py-4 px-6 border border-white/5 bg-black/30 hover:bg-accent-red/5 hover:border-accent-red/30 text-text-secondary hover:text-white transition-all duration-300 rounded-sm group relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-accent-red font-bold group-hover:scale-110 transition-transform">
                      [{opt.id.toUpperCase()}]
                    </span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-[10px] text-text-ghost pt-4 border-t border-white/5">
              <span>SYSTEM: NARRATIVE_DECISION_FLOW_V1</span>
              <span>STATUS: WAITING_FOR_INPUT</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
