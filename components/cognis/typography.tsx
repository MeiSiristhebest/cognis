import React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps {
  variant?: 'mono' | 'h1' | 'h2' | 'h3' | 'body' | 'label'
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Typography({ variant = 'body', children, className, style }: TypographyProps) {
  if (variant === 'h1') {
    return (
      <h1 style={style} className={cn('text-h1 font-display text-text-primary', className)}>
        {children}
      </h1>
    )
  }
  if (variant === 'h2') {
    return (
      <h2 style={style} className={cn('text-h2 font-display text-text-primary', className)}>
        {children}
      </h2>
    )
  }
  if (variant === 'h3') {
    return (
      <h3 style={style} className={cn('text-3xl font-display text-text-primary', className)}>
        {children}
      </h3>
    )
  }
  if (variant === 'mono') {
    return (
      <span style={style} className={cn('font-mono', className)}>
        {children}
      </span>
    )
  }
  if (variant === 'label') {
    return (
      <span style={style} className={cn('text-label font-mono text-text-tertiary', className)}>
        {children}
      </span>
    )
  }
  return (
    <p style={style} className={cn('text-body font-mono text-text-secondary', className)}>
      {children}
    </p>
  )
}

interface LegacyTypographyProps {
  children: React.ReactNode
  className?: string
}

export function Display({ children, className }: LegacyTypographyProps) {
  return (
    <h1 className={cn('text-display font-display', className)}>
      {children}
    </h1>
  )
}

export function Heading1({ children, className }: LegacyTypographyProps) {
  return (
    <h1 className={cn('text-h1 font-display', className)}>
      {children}
    </h1>
  )
}

export function Heading2({ children, className }: LegacyTypographyProps) {
  return (
    <h2 className={cn('text-h2 font-display', className)}>
      {children}
    </h2>
  )
}

export function Body({ children, className }: LegacyTypographyProps) {
  return (
    <p className={cn('text-body font-mono', className)}>
      {children}
    </p>
  )
}

export function Label({ children, className }: LegacyTypographyProps) {
  return (
    <span className={cn('text-label font-mono', className)}>
      {children}
    </span>
  )
}
