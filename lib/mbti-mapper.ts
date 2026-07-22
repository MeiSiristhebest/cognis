/**
 * MBTI and Jungian Cognitive Functions Mapping Engine.
 * Formulates the classic MBTI 4-letter type from dominant and auxiliary cognitive functions.
 */

export interface JungianFunctions {
  primary: string;   // e.g. "Ni", "Te"
  auxiliary: string; // e.g. "Te", "Fi"
}

/**
 * Maps Jungian cognitive stack preferences to the standard Myers-Briggs 4-letter type.
 * 
 * Rules:
 * 1. Extraversion (E) / Introversion (I): Determined by dominant function orientation ('e' or 'i').
 * 2. Intuition (N) / Sensing (S): S if dominant or auxiliary is S; N if dominant or auxiliary is N.
 * 3. Thinking (T) / Feeling (F): T if dominant or auxiliary is T; F if dominant or auxiliary is F.
 * 4. Judging (J) / Perceiving (P): J if the highest extraverted function is Judging (T/F); P if Perceiving (N/S).
 */
export function mapFunctionsToMBTI(jungian: JungianFunctions): string {
  try {
    const dominant = jungian.primary;
    const auxiliary = jungian.auxiliary;

    if (!dominant || !auxiliary) return "INTJ"; // Fallback default

    // 1. First Letter: I / E
    const ie = dominant.endsWith("e") ? "E" : "I";

    // 2. Second Letter: N / S
    let ns = "N";
    if (dominant.startsWith("S") || auxiliary.startsWith("S")) {
      ns = "S";
    } else if (dominant.startsWith("N") || auxiliary.startsWith("N")) {
      ns = "N";
    }

    // 3. Third Letter: T / F
    let tf = "T";
    if (dominant.startsWith("F") || auxiliary.startsWith("F")) {
      tf = "F";
    } else if (dominant.startsWith("T") || auxiliary.startsWith("T")) {
      tf = "T";
    }

    // 4. Fourth Letter: J / P
    // The J/P dimension reflects which function is extraverted.
    // If the extraverted function is a Judging function (T or F), the type is J.
    // If the extraverted function is a Perceiving function (N or S), the type is P.
    const extravertedFunction = dominant.endsWith("e") ? dominant : auxiliary;
    const jp =
      extravertedFunction.startsWith("T") || extravertedFunction.startsWith("F")
        ? "J"
        : "P";

    return `${ie}${ns}${tf}${jp}`;
  } catch (err) {
    console.error("[mapFunctionsToMBTI Error]:", err);
    return "INTJ";
  }
}
