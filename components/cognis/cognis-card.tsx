import { cn } from '@/lib/utils'

interface CognisCardProps {
  children: React.ReactNode
  className?: string
}

export function CognisCard({ children, className }: CognisCardProps) {
  return (
    <div
      className={cn(
        'bg-bg-surface border border-border-subtle p-6',
        'rounded-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CognisCardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CognisCardHeader({ children, className }: CognisCardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}

interface CognisCardTitleProps {
  children: React.ReactNode
  className?: string
}

export function CognisCardTitle({ children, className }: CognisCardTitleProps) {
  return (
    <h3 className={cn('text-h2 font-display', className)}>
      {children}
    </h3>
  )
}

interface CognisCardContentProps {
  children: React.ReactNode
  className?: string
}

export function CognisCardContent({ children, className }: CognisCardContentProps) {
  return (
    <div className={cn('text-body text-text-secondary', className)}>
      {children}
    </div>
  )
}
