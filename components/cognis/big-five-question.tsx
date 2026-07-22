"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./progress-bar";

interface BigFiveQuestionProps {
  scenarioHeadline: string;
  subText: string;
  leftAnchor: string;
  rightAnchor: string;
  leftBehavior: string;
  rightBehavior: string;
  dimensionLabel: string;
  progress: number; // 0-1
  onValueChange: (value: number) => void;
  onNext: (value: number) => void;
}

// Helper to strip dimension labels like (低E) or (高N) to prevent faking/social desirability bias
const stripDimension = (anchor: string) => {
  return anchor.replace(/\s*\(高[A-Z]\)|\s*\(低[A-Z]\)/g, "");
};

export function BigFiveQuestion({
  scenarioHeadline,
  subText,
  leftAnchor,
  rightAnchor,
  leftBehavior,
  rightBehavior,
  dimensionLabel,
  progress,
  onValueChange,
  onNext,
}: BigFiveQuestionProps) {
  const [displayedHeadline, setDisplayedHeadline] = useState("");
  const [showSubText, setShowSubText] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [sliderValue, setSliderValue] = useState(50); // 0-100, center is 50
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setDisplayedHeadline("");
    setShowSubText(false);
    setShowSlider(false);
    setSliderValue(50);
    setHasInteracted(false);

    let index = 0;
    const interval = setInterval(() => {
      if (index < scenarioHeadline.length) {
        setDisplayedHeadline(scenarioHeadline.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSubText(true), 100);
        setTimeout(() => setShowSlider(true), 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [scenarioHeadline]);
  const deviation = Math.abs(sliderValue - 50);
  const fillOpacity = deviation / 50; // 0 at center, 1 at edges
  const isLeftOfCenter = sliderValue < 50;
  // Behavior description based on position
  const getBehaviorDescription = () => {
    const cleanLeft = stripDimension(leftAnchor);
    const cleanRight = stripDimension(rightAnchor);
    if (deviation < 12) return "— 中立 —";
    if (sliderValue < 20) return `强烈倾向：${cleanLeft}`;
    if (sliderValue <= 38) return `轻微倾向：${cleanLeft}`;
    if (sliderValue > 80) return `强烈倾向：${cleanRight}`;
    if (sliderValue >= 62) return `轻微倾向：${cleanRight}`;
    return "— 中立 —";
  };
  const canProceed = hasInteracted && deviation >= 15;

  const handleSliderInteraction = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

      setSliderValue(percentage);
      setHasInteracted(true);
      onValueChange(percentage);
    },
    [onValueChange],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderInteraction(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderInteraction(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleSliderInteraction(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleSliderInteraction(e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleSliderInteraction]);

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-8">
        {/* Dimension label */}
        <div
          className="font-mono text-[16px] uppercase tracking-[0.15em] text-text-tertiary mb-8 md:mb-10"
          style={{ letterSpacing: "0.15em" }}
        >
          {dimensionLabel}
        </div>

        {/* Scenario headline */}
        <h1
          className="font-display text-[40px] md:text-[52px] text-text-primary text-center max-w-[680px] leading-[1.3]"
          style={{ minHeight: "2.5em" }}
        >
          {displayedHeadline}
          <span
            className={cn(
              "inline-block w-[2px] h-[0.9em] bg-text-primary ml-2 align-middle",
              displayedHeadline.length === scenarioHeadline.length && "hidden",
            )}
            style={{
              animation: "blink 1s step-end infinite",
            }}
          />
        </h1>

        {/* Sub-text */}
        <p
          className={cn(
            "font-mono text-[18px] text-text-secondary text-center max-w-[560px] mt-8 leading-relaxed transition-opacity duration-300",
            showSubText ? "opacity-100" : "opacity-0",
          )}
        >
          {subText}
        </p>

        {/* Behavior Cards */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[680px] mt-8 transition-opacity duration-300",
            showSubText ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Left Behavior Card */}
          <div
            className={cn(
              "border p-5 rounded-sm transition-all duration-300 bg-black/20 flex flex-col justify-between cursor-pointer select-none",
              hasInteracted && sliderValue < 45
                ? "border-accent-red/50 bg-accent-red/5"
                : "border-white/5 opacity-70 hover:opacity-100 hover:border-white/20"
            )}
            onClick={() => {
              setSliderValue(25);
              setHasInteracted(true);
              onValueChange(25);
            }}
          >
            <div>
              <span className="font-mono text-[11px] text-accent-red uppercase tracking-wider block mb-2">
                [ 选项 A // {stripDimension(leftAnchor)} ]
              </span>
              <p className="font-mono text-[13px] text-text-primary leading-relaxed">
                {leftBehavior}
              </p>
            </div>
          </div>

          {/* Right Behavior Card */}
          <div
            className={cn(
              "border p-5 rounded-sm transition-all duration-300 bg-black/20 flex flex-col justify-between cursor-pointer select-none",
              hasInteracted && sliderValue > 55
                ? "border-accent-red/50 bg-accent-red/5"
                : "border-white/5 opacity-70 hover:opacity-100 hover:border-white/20"
            )}
            onClick={() => {
              setSliderValue(75);
              setHasInteracted(true);
              onValueChange(75);
            }}
          >
            <div>
              <span className="font-mono text-[11px] text-accent-red uppercase tracking-wider block mb-2">
                [ 选项 B // {stripDimension(rightAnchor)} ]
              </span>
              <p className="font-mono text-[13px] text-text-primary leading-relaxed">
                {rightBehavior}
              </p>
            </div>
          </div>
        </div>

        {/* Slider section */}
        <div
          className={cn(
            "w-full max-w-[640px] mt-12 transition-opacity duration-200 flex flex-col items-center",
            showSlider ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          {/* Slider track */}
          <div
            ref={sliderRef}
            className="relative w-full h-12 cursor-pointer select-none touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Track background */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-white/15" />

            {/* Center tick */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-4 bg-white/30" />

            {/* Fill from center */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[2px] transition-all duration-75"
              style={{
                left: isLeftOfCenter ? `${sliderValue}%` : "50%",
                right: isLeftOfCenter ? "50%" : `${100 - sliderValue}%`,
                backgroundColor: `rgba(255, 255, 255, ${fillOpacity * 0.8})`,
              }}
            />

            {/* Thumb */}
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white transition-transform duration-75 shadow-[0_0_10px_rgba(255,255,255,0.3)]",
                isDragging ? "w-4 h-4" : "w-3 h-3",
              )}
              style={{ left: `${sliderValue}%` }}
            />
          </div>

          {/* Anchor labels */}
          <div className="flex justify-between w-full mt-3 px-1">
            <span
              className="font-mono text-[13px] text-text-tertiary uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              {stripDimension(leftAnchor)}
            </span>
            <span
              className="font-mono text-[13px] text-text-tertiary uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              {stripDimension(rightAnchor)}
            </span>
          </div>

          {/* Behavior description */}
          <div className="text-center mt-10 h-6">
            <span className="font-mono text-[16px] text-text-secondary transition-colors duration-300">
              {getBehaviorDescription()}
            </span>
          </div>

          {/* Next button */}
          <div className="mt-12 h-12 flex justify-center">
            <button
              onClick={() => onNext(sliderValue)}
              disabled={!canProceed}
              className={cn(
                "font-mono text-[16px] uppercase tracking-[0.1em] px-12 py-3 border transition-all duration-300",
                canProceed
                  ? "border-text-primary text-bg-void bg-text-primary hover:bg-accent-red hover:border-accent-red hover:text-white cursor-pointer translate-y-0 opacity-100"
                  : "border-border-subtle text-text-tertiary bg-transparent cursor-not-allowed translate-y-4 opacity-0 pointer-events-none",
              )}
            >
              Next
            </button>
          </div>
        </div>

        {/* Cursor blink animation */}
        <style jsx>{`
          @keyframes blink {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
  );
}
