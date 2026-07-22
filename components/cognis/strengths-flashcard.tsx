"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Card {
  id: string;
  word: string;
  hint: string;
}

interface Selection {
  cardId: string;
  choice: "like" | "dislike";
  rt: number;
}

interface StrengthsFlashcardProps {
  cards: Card[];
  duration?: number; // Timer duration in ms, default 4000
  onComplete: (data: {
    selections: Selection[];
    timeouts: string[];
    reactionTimes: number[];
  }) => void;
}

type ExitDirection = "left" | "right" | "timeout" | null;

export function StrengthsFlashcard({
  cards,
  duration = 4000,
  onComplete,
}: StrengthsFlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(100);
  const [phase, setPhase] = useState<
    "entering" | "active" | "exiting" | "void"
  >("entering");
  const [exitDirection, setExitDirection] = useState<ExitDirection>(null);
  const [flashOverlay, setFlashOverlay] = useState<"left" | "right" | null>(
    null,
  );
  const [isPulsing, setIsPulsing] = useState(true);

  const selectionsRef = useRef<Selection[]>([]);
  const timeoutsRef = useRef<string[]>([]);
  const reactionTimesRef = useRef<number[]>([]);
  const cardAppearedAtRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const currentCard = cards[currentIndex];

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const goToNextCard = useCallback(() => {
    if (currentIndex >= cards.length - 1) {
      onComplete({
        selections: selectionsRef.current,
        timeouts: timeoutsRef.current,
        reactionTimes: reactionTimesRef.current,
      });
      return;
    }

    setPhase("void");

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setProgress(100);
      setExitDirection(null);
      setPhase("entering");
      setIsPulsing(true);

      setTimeout(() => {
        setPhase("active");
        cardAppearedAtRef.current = Date.now();
      }, 150);
    }, 80);
  }, [currentIndex, cards.length, onComplete]);

  const handleSelection = useCallback(
    (choice: "like" | "dislike") => {
      if (phase !== "active") return;

      clearTimers();
      setIsPulsing(false);

      const rt = Date.now() - cardAppearedAtRef.current;
      reactionTimesRef.current.push(rt);
      selectionsRef.current.push({
        cardId: currentCard.id,
        choice,
        rt,
      });

      setFlashOverlay(choice === "like" ? "right" : "left");
      setExitDirection(choice === "like" ? "right" : "left");
      setPhase("exiting");

      setTimeout(() => {
        setFlashOverlay(null);
      }, 100);

      setTimeout(() => {
        goToNextCard();
      }, 150);
    },
    [phase, currentCard, clearTimers, goToNextCard],
  );

  const handleTimeout = useCallback(() => {
    if (phase !== "active") return;

    clearTimers();
    setIsPulsing(false);
    timeoutsRef.current.push(currentCard.id);

    setExitDirection("timeout");
    setPhase("exiting");

    setTimeout(() => {
      goToNextCard();
    }, 200);
  }, [phase, currentCard, clearTimers, goToNextCard]);
  useEffect(() => {
    cardAppearedAtRef.current = Date.now();
    const timer = setTimeout(() => {
      setPhase("active");
    }, 150);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (phase !== "active") return;

    const startTime = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(progressRef.current!);
      }
    }, 16);

    timerRef.current = setTimeout(() => {
      handleTimeout();
    }, duration);

    return clearTimers;
  }, [phase, duration, handleTimeout, clearTimers]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleSelection("dislike");
      } else if (e.key === "ArrowRight") {
        handleSelection("like");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSelection]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        handleSelection("like");
      } else {
        handleSelection("dislike");
      }
    }

    touchStartRef.current = null;
  };
  const progressColor = progress <= 37.5 ? "bg-accent-red" : "bg-white/40";
  const getCardClasses = () => {
    const base =
      "relative w-[320px] h-[420px] bg-bg-surface border border-border-default flex flex-col items-center justify-center";

    if (phase === "entering") {
      return `${base} animate-card-enter`;
    }

    if (phase === "exiting") {
      if (exitDirection === "left") return `${base} animate-card-exit-left`;
      if (exitDirection === "right") return `${base} animate-card-exit-right`;
    }

    return base;
  };

  const cardContent = (
    <>
      <div className="font-display text-[48px] text-text-primary text-center px-6">
        {currentCard.word}
      </div>
      <div className="font-mono text-[10px] text-text-ghost mt-4 text-center px-6">
        {currentCard.hint}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
        <div
          className={`h-full ${progressColor} transition-colors duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
  const renderDots = () => {
    return cards.map((_, i) => {
      if (i < currentIndex) {
        return (
          <span key={i} className="text-text-tertiary">
            ●
          </span>
        );
      }
      if (i === currentIndex) {
        return (
          <span key={i} className="text-text-secondary">
            ○
          </span>
        );
      }
      return (
        <span key={i} className="text-text-ghost">
          ·
        </span>
      );
    });
  };

  if (phase === "void") {
    return <div className="fixed inset-0 bg-bg-void" />;
  }

  return (
    <div
      className="fixed inset-0 bg-bg-void flex items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Flash overlay */}
      {flashOverlay && (
        <div
          className={`fixed inset-0 pointer-events-none transition-opacity duration-100 ${
            flashOverlay === "left" ? "bg-white/[0.04]" : "bg-white/[0.08]"
          }`}
        />
      )}

      {/* Side labels */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-text-ghost">
        不像我
      </div>
      <div className="fixed right-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-text-ghost">
        正是我
      </div>

      {/* Click zones */}
      <div
        className="fixed left-0 top-0 w-1/2 h-full cursor-pointer z-10"
        onClick={() => handleSelection("dislike")}
      />
      <div
        className="fixed right-0 top-0 w-1/2 h-full cursor-pointer z-10"
        onClick={() => handleSelection("like")}
      />

      {/* Heartbeat pulse ring */}
      <div
        className={`absolute w-[360px] h-[460px] border border-accent-red-dim rounded-none ${
          isPulsing ? "animate-heartbeat" : "opacity-0"
        }`}
      />

      {/* The Card */}
      {phase === "exiting" && exitDirection === "timeout" ? (
        <div className="relative w-[320px] h-[420px]">
          <div
            className="absolute inset-0 animate-card-break-top bg-bg-surface border border-border-default flex flex-col items-center justify-center"
            style={{ clipPath: "inset(0 0 50% 0)" }}
          >
            {cardContent}
          </div>
          <div
            className="absolute inset-0 animate-card-break-bottom bg-bg-surface border border-border-default flex flex-col items-center justify-center"
            style={{ clipPath: "inset(50% 0 0 0)" }}
          >
            {cardContent}
          </div>
        </div>
      ) : (
        <div className={getCardClasses()}>{cardContent}</div>
      )}

      {/* Card counter */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] flex gap-1">
        {renderDots()}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes card-exit-left {
          to {
            opacity: 0;
            transform: translateX(-200px);
          }
        }

        @keyframes card-exit-right {
          to {
            opacity: 0;
            transform: translateX(200px);
          }
        }

        @keyframes card-break-top {
          to {
            opacity: 0;
            transform: translateY(-40px);
          }
        }

        @keyframes card-break-bottom {
          to {
            opacity: 0;
            transform: translateY(40px);
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.03);
            opacity: 0.6;
          }
        }

        .animate-card-enter {
          animation: card-enter 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-card-exit-left {
          animation: card-exit-left 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-card-exit-right {
          animation: card-exit-right 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-card-break-top {
          animation: card-break-top 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-card-break-bottom {
          animation: card-break-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }

        .animate-heartbeat {
          animation: heartbeat 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
