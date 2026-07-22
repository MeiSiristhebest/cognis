'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number // 0 to 100
  className?: string
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-px bg-border-subtle z-50',
        className
      )}
    >
      <div
        className="h-full bg-accent-red transition-all duration-150"
        style={{
          width: `${clampedProgress}%`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  )
}
