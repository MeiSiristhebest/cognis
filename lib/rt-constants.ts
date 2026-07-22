/**
 * RT_CONFIG: Unified psychological and physiological constraints for behavioral reaction time data.
 */
export const RT_CONFIG = {
  MIN_RT: 200,             // Physiological limit of human brain recognition (200ms)
  MAX_RT: 8000,            // Threshold where distraction or alt-tabbing occurred (8s)
  DEFAULT_BASELINE: 1000,  // Standard fallback baseline
  PENALTY_RT: 4000,        // Safe default fallback when RT is timed out or corrupted
};
