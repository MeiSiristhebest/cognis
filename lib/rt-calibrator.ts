import { RT_CONFIG } from "./rt-constants";

/**
 * Normalizes actual reaction time by subtracting the physical hardware baseline.
 * 
 * @param actualRt Measured timestamp difference in ms
 * @param baseRt Physical latency determined during warm-up (typically 200ms - 350ms)
 * @returns Cleaned cognitive reaction time in ms
 */
export function getCleanedRT(actualRt: number, baseRt: number): number {
  const baseShift = Math.max(50, baseRt); // Ensure base baseline is healthy
  const cleaned = actualRt - baseShift;

  if (cleaned < RT_CONFIG.MIN_RT) {
    return RT_CONFIG.MIN_RT;
  }
  
  if (cleaned > RT_CONFIG.MAX_RT) {
    return RT_CONFIG.PENALTY_RT;
  }

  return Math.round(cleaned);
}
