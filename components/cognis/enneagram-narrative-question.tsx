'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ProgressBar } from './progress-bar'

interface EnneagramOption {
  id: string
  text: string
}

interface EnneagramNarrativeQuestionProps {
  scenarioLocation: string // e.g. "22:47 · 你的办公室 · 独自一人"
  situationText: string // The narrative paragraph
  questionPrompt: string // e.g. "此刻，你脑海中最无法驱散的念头是——"
  options: EnneagramOption[]
  isStressTest?: boolean
  progress: number // 0-1
  onSelect: (optionId: string) => void
}

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F']

export function EnneagramNarrativeQuestion({
  scenarioLocation,
  situationText,
  questionPrompt,
  options,
  isStressTest = false,
  progress,
  onSelect,
}: EnneagramNarrativeQuestionProps) {
  const [showStressIndicator, setShowStressIndicator] = useState(isStressTest)
  const [showLocation, setShowLocation] = useState(false)
  const [displayedSituation, setDisplayedSituation] = useState('')
  const [situationComplete, setSituationComplete] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [visibleOptions, setVisibleOptions] = useState<number>(0)
  const [showProgress, setShowProgress] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  useEffect(() => {
    setShowStressIndicator(isStressTest)
    setShowLocation(false)
    setDisplayedSituation('')
    setSituationComplete(false)
    setShowQuestion(false)
    setVisibleOptions(0)
    setShowProgress(false)
    setSelectedId(null)
    setIsTransitioning(false)
    
    const stressDelay = isStressTest ? 1400 : 0
    const locationTimer = setTimeout(() => {
      setShowStressIndicator(false)
      setShowLocation(true)
    }, stressDelay)

    return () => clearTimeout(locationTimer)
  }, [scenarioLocation, situationText, isStressTest])
  useEffect(() => {
    if (!showLocation) return

    const startTimer = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < situationText.length) {
          setDisplayedSituation(situationText.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setSituationComplete(true)
        }
      }, 18) // 18ms per character

      return () => clearInterval(interval)
    }, 800)

    return () => clearTimeout(startTimer)
  }, [showLocation, situationText])
  useEffect(() => {
    if (!situationComplete) return

    const timer = setTimeout(() => {
      setShowQuestion(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [situationComplete])
  useEffect(() => {
    if (!showQuestion) return

    const showNextOption = (index: number) => {
      if (index <= options.length) {
        setTimeout(() => {
          setVisibleOptions(index)
          if (index === options.length) {
            setTimeout(() => setShowProgress(true), 200)
          } else {
            showNextOption(index + 1)
          }
        }, 150)
      }
    }

    showNextOption(1)
  }, [showQuestion, options.length])

  const handleOptionClick = useCallback((optionId: string) => {
    if (isTransitioning) return
    
    setSelectedId(optionId)
    setIsTransitioning(true)
    setTimeout(() => {
      onSelect(optionId)
    }, 200)
  }, [isTransitioning, onSelect])

  return (
    <div className="flex flex-col w-full relative py-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-[680px] mx-auto w-full">
        {/* Stress indicator (subliminal) */}
        {isStressTest && (
          <div
            className={cn(
              'text-center mb-12 transition-opacity duration-[1200ms]',
              showStressIndicator ? 'opacity-100' : 'opacity-0'
            )}
          >
            <span
              className="font-mono text-[9px] text-accent-red"
              style={{ letterSpacing: '0.15em' }}
            >
              压力情境
            </span>
          </div>
        )}

        {/* Phase 1: Location */}
        <div
          className={cn(
            'mb-10 transition-opacity duration-[400ms]',
            showLocation ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span
            className="font-mono text-[10px] uppercase text-[#333330]"
            style={{ letterSpacing: '0.2em' }}
          >
            {scenarioLocation}
          </span>
        </div>

        {/* Phase 2: Situation narrative */}
        <div className="mb-10 min-h-[120px]">
          <p
            className="font-display text-[28px] md:text-[36px] text-text-primary leading-[1.35]"
          >
            {displayedSituation}
            {!situationComplete && displayedSituation.length > 0 && (
              <span
                className="inline-block w-[2px] h-[0.9em] bg-text-primary ml-1 align-baseline"
                style={{ animation: 'cursorBlink 1s step-end infinite' }}
              />
            )}
          </p>
        </div>

        {/* Phase 3: Question prompt */}
        <div
          className={cn(
            'mb-8 transition-opacity duration-300',
            showQuestion ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="font-mono text-[13px] text-[#888880] leading-relaxed">
            {questionPrompt}
          </span>
        </div>

        {/* Options */}
        <div className="space-y-0">
          {options.map((option, index) => {
            const isVisible = index < visibleOptions
            const isSelected = selectedId === option.id

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={!isVisible || isTransitioning}
                className={cn(
                  'w-full text-left py-5 px-6 border-l-2 transition-all duration-100',
                  'font-mono text-[13px] leading-relaxed',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2',
                  isSelected
                    ? 'border-l-accent-red bg-[rgba(232,64,64,0.08)] text-text-primary'
                    : 'border-l-[rgba(255,255,255,0.06)] text-[#888880] hover:border-l-[rgba(255,255,255,0.4)] hover:text-text-primary hover:bg-[rgba(255,255,255,0.03)]',
                  !isVisible && 'pointer-events-none'
                )}
                style={{
                  transitionDelay: isVisible ? '0ms' : `${index * 150}ms`,
                }}
              >
                <span
                  className="font-mono text-[10px] text-[#333330] mr-4"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {OPTION_LABELS[index]}.
                </span>
                {option.text}
              </button>
            )
          })}
        </div>
      </div>

      {/* Cursor blink animation */}
      <style jsx>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
