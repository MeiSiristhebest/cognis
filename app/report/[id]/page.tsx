import { notFound } from "next/navigation";
import { ResultsDashboard } from "@/components/cognis/results-dashboard";
import prisma from "@/lib/db";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;

  const assessment = await prisma.assessment.findUnique({
    where: { id },
  });

  if (!assessment) {
    notFound();
  }

  const reportData = assessment.report as any;

  return (
    <main className="min-h-screen bg-bg-void">
      <ResultsDashboard
        results={{
          bigFive: {
            O: reportData.bigFive.scores.O,
            C: reportData.bigFive.scores.C,
            E: reportData.bigFive.scores.E,
            A: reportData.bigFive.scores.A,
            N: reportData.bigFive.scores.N,
          },
          enneagram: {
            main: reportData.enneagram.primaryType,
            wing: reportData.enneagram.wing,
            variant: reportData.enneagram.instinctualVariant,
            healthLevel: reportData.enneagram.healthLevel,
          },
          disc: {
            x: reportData.disc.vector.x,
            y: reportData.disc.vector.y,
            quadrant: reportData.disc.quadrant,
          },
          strengths: reportData.strengths.topTalents,
          jungian: {
            dominant: reportData.jungian.primary,
            auxiliary: reportData.jungian.auxiliary,
            tertiary: reportData.jungian.tertiary,
            inferior: reportData.jungian.inferior,
            confidence: reportData.jungian.confidence,
          },
        }}
      />
    </main>
  );
}
