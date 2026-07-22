"use server";

import { AssessmentState, SerializableAssessmentState } from "@/lib/assessment-store";
import {
  processAssessmentData,
  ComprehensiveReport,
} from "@/lib/scoring-engine";
import prisma from "@/lib/db";
import { mapFunctionsToMBTI } from "@/lib/mbti-mapper";

/**
 * saveAssessment: Robust server action for incremental saving and final processing.
 * Supports partial state updates for checkpointing.
 */
export async function saveAssessment(
  state: SerializableAssessmentState,
  isFinal: boolean = false,
): Promise<{
  success: boolean;
  reportId?: string;
  report?: ComprehensiveReport;
  error?: string;
}> {
  try {
    // 1. If final, compute the full report
    const report = isFinal ? processAssessmentData(state) : null;

    // 2. Prepare structured data for analytics indexing
    const structuredData: any = {};

    if (report) {
      structuredData.bf_O = report.bigFive.scores.O;
      structuredData.bf_C = report.bigFive.scores.C;
      structuredData.bf_E = report.bigFive.scores.E;
      structuredData.bf_A = report.bigFive.scores.A;
      structuredData.bf_N = report.bigFive.scores.N;

      structuredData.jungian_type = mapFunctionsToMBTI(report.jungian);
      structuredData.jungian_primary = report.jungian.primary;

      structuredData.enneagram_type = report.enneagram.primaryType;
      structuredData.enneagram_wing = report.enneagram.wing;
      structuredData.enneagram_variant = report.enneagram.instinctualVariant;

      structuredData.disc_quadrant = report.disc.quadrant;
      structuredData.disc_vector_x = report.disc.vector.x;
      structuredData.disc_vector_y = report.disc.vector.y;
    }

    // 3. Perform atomic upsert (checkpointing)
    // Assuming state.sessionId is generated on the client or passed during session start
    const sessionId = state.sessionId || undefined;

    const savedAssessment = await prisma.assessment.upsert({
      where: {
        id: sessionId || "00000000-0000-0000-0000-000000000000", // Placeholder if no ID provided
      },
      update: {
        rawState: state as any,
        report: report as any,
        isCompleted: isFinal,
        completedAt: isFinal ? new Date() : null,
        physicalRtBaseMs: state.physicalRtBaseMs,
        ...structuredData,
      },
      create: {
        id: sessionId,
        rawState: state as any,
        report: report as any,
        isCompleted: isFinal,
        completedAt: isFinal ? new Date() : null,
        physicalRtBaseMs: state.physicalRtBaseMs,
        ...structuredData,
      },
    });

    return {
      success: true,
      reportId: savedAssessment.id,
      report: report || undefined,
    };
  } catch (error) {
    console.error("[Assessment Action Error]:", error);
    return {
      success: false,
      error:
        "Failed to process and save assessment data. Your progress might be lost.",
    };
  }
}
