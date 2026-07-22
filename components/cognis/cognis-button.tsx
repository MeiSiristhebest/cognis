'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface CognisButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'active'
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const CognisButton = forwardRef<HTMLButtonElement, CognisButtonProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'w-full h-16 px-6',
          'font-mono text-[16px] tracking-wide',
          'bg-transparent border border-border-default',
          'text-text-primary',
          'transition-all duration-150',
          'hover:border-border-active hover:bg-bg-raised',
          'focus-visible:outline-none focus-visible:border-border-active',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'rounded-none',
          variant === 'active' && [
            'border-accent-red',
            'bg-accent-red-dim',
            'hover:bg-accent-red-dim',
          ],
          className
        )}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CognisButton.displayName = 'CognisButton'
