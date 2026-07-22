import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BigFiveResponse {
  questionId: string;
  value: number;
  rt: number;
}

export interface EnneagramResponse {
  questionId: string;
  selectedOption: "a" | "b" | "c" | "d";
  rt: number;
}

export interface DiSCResponse {
  scenarioId: string;
  vector: { x: number; y: number };
}

export interface StrengthsResponse {
  cardId: string;
  choice: "like" | "dislike";
  rt: number;
}

export interface ImageDecodingResult {
  imageId: string;
  selectedOption: string;
  cognitiveBias: "N" | "S";
  rt: number;
}

export interface ResourceAllocationResult {
  taskId: string;
  allocations: Record<string, number>;
  adjustmentSequence: string[];
  revisionCounts: Record<string, number>;
  totalTime: number;
}

export interface AssessmentState {
  sessionId: string | null;
  step: number; // 0: BigFive, 1: Enneagram, 2: DiSC, 3: Strengths, 4: Jungian
  physicalRtBaseMs: number;
  gear: "short" | "medium" | "full";
  career: "tech" | "business" | "creative" | "finance" | "healthcare" | "legal" | "education" | "manufacturing" | "general";
  interest: "ai" | "finance" | "creative" | "lifestyle";

  bigFive: {
    responses: BigFiveResponse[];
  };
  enneagram: {
    responses: EnneagramResponse[];
  };
  disc: {
    responses: DiSCResponse[];
  };
  strengths: {
    responses: StrengthsResponse[];
  };
  jungian: {
    imageDecoding: ImageDecodingResult[];
    resourceAllocation: ResourceAllocationResult[];
  };

  // Actions
  setSessionId: (id: string) => void;
  setGear: (gear: "short" | "medium" | "full") => void;
  setPreferences: (
    career: "tech" | "business" | "creative" | "finance" | "healthcare" | "legal" | "education" | "manufacturing" | "general",
    interest: "ai" | "finance" | "creative" | "lifestyle",
  ) => void;
  nextStep: () => void;
  setStep: (step: number) => void;
  setPhysicalRtBaseMs: (rt: number) => void;

  setBigFiveResponse: (id: string, value: number, rt: number) => void;
  setEnneagramResponse: (
    id: string,
    option: "a" | "b" | "c" | "d",
    rt: number,
  ) => void;
  setDiSCResponse: (id: string, vector: { x: number; y: number }) => void;
  addStrengthsResponse: (
    id: string,
    choice: "like" | "dislike",
    rt: number,
  ) => void;
  addImageDecoding: (
    imageId: string,
    optId: string,
    bias: "N" | "S",
    rt: number,
  ) => void;
  addResourceAllocation: (
    taskId: string,
    allocations: Record<string, number>,
    sequence: string[],
    revisions: Record<string, number>,
    time: number,
  ) => void;

  resetAssessment: () => void;
}

export type SerializableAssessmentState = Omit<
  AssessmentState,
  | "setSessionId"
  | "setGear"
  | "setPreferences"
  | "nextStep"
  | "setStep"
  | "setPhysicalRtBaseMs"
  | "setBigFiveResponse"
  | "setEnneagramResponse"
  | "setDiSCResponse"
  | "addStrengthsResponse"
  | "addImageDecoding"
  | "addResourceAllocation"
  | "resetAssessment"
>;

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      sessionId: null,
      step: 0,
      physicalRtBaseMs: 250,
      gear: "full",
      career: "general",
      interest: "lifestyle",

      bigFive: { responses: [] },
      enneagram: { responses: [] },
      disc: { responses: [] },
      strengths: { responses: [] },
      jungian: { imageDecoding: [], resourceAllocation: [] },

      setSessionId: (id) => set({ sessionId: id }),
      setGear: (gear) => set({ gear }),
      setPreferences: (career, interest) => set({ career, interest }),

      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),

      setStep: (step) => set({ step }),

      setPhysicalRtBaseMs: (rt) => set({ physicalRtBaseMs: rt }),

      setBigFiveResponse: (id, value, rt) =>
        set((state) => ({
          bigFive: {
            responses: [
              ...state.bigFive.responses.filter((r) => r.questionId !== id),
              { questionId: id, value, rt },
            ],
          },
        })),

      setEnneagramResponse: (id, option, rt) =>
        set((state) => ({
          enneagram: {
            responses: [
              ...state.enneagram.responses.filter((r) => r.questionId !== id),
              { questionId: id, selectedOption: option, rt },
            ],
          },
        })),

      setDiSCResponse: (id, vector) =>
        set((state) => ({
          disc: {
            responses: [
              ...state.disc.responses.filter((r) => r.scenarioId !== id),
              { scenarioId: id, vector },
            ],
          },
        })),

      addStrengthsResponse: (id, choice, rt) =>
        set((state) => ({
          strengths: {
            responses: [
              ...state.strengths.responses.filter((r) => r.cardId !== id),
              { cardId: id, choice, rt },
            ],
          },
        })),

      addImageDecoding: (imageId, optId, bias, rt) =>
        set((state) => ({
          jungian: {
            ...state.jungian,
            imageDecoding: [
              ...state.jungian.imageDecoding.filter(
                (r) => r.imageId !== imageId,
              ),
              { imageId, selectedOption: optId, cognitiveBias: bias, rt },
            ],
          },
        })),

      addResourceAllocation: (taskId, allocations, sequence, revisions, time) =>
        set((state) => ({
          jungian: {
            ...state.jungian,
            resourceAllocation: [
              ...state.jungian.resourceAllocation.filter(
                (r) => r.taskId !== taskId,
              ),
              {
                taskId,
                allocations,
                adjustmentSequence: sequence,
                revisionCounts: revisions,
                totalTime: time,
              },
            ],
          },
        })),

      resetAssessment: () =>
        set({
          step: 0,
          physicalRtBaseMs: 250,
          gear: "full",
          career: "general",
          interest: "lifestyle",
          bigFive: { responses: [] },
          enneagram: { responses: [] },
          disc: { responses: [] },
          strengths: { responses: [] },
          jungian: { imageDecoding: [], resourceAllocation: [] },
        }),
    }),
    {
      name: "cognis-assessment-storage",
    },
  ),
);
