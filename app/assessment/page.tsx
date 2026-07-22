'use client'

import { AssessmentShell } from '@/components/cognis/assessment-shell'

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-bg-void selection:bg-accent-red/30">
      <AssessmentShell />
    </main>
  )
}
