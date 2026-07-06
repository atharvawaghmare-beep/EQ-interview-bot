export const LATEST_REPORT_STORAGE_KEY = "latestInterviewReport";

export interface EmotionSample {
  timestamp: number;
  emotion: string;
  emotionConfidence: number;
  faceConfidence: number;
  motionScore?: number;
  motionLevel?: string;
}

export interface StammerMetrics {
  fillerWordCount: number;
  repeatedWordCount: number;
  pauseMarkerCount: number;
  longPauseCount?: number;
  wordCount?: number;
  wordsPerMinute?: number;
  stammerScore: number;
  isStammering: boolean;
}

export interface NervousMetrics {
  dominantEmotion: string;
  emotionConfidence: number;
  primaryState?: "confident" | "calm" | "nervous" | "surprised" | "tense" | "uncertain";
  stateConfidence?: number;
  deliveryStates?: {
    confident: number;
    calm: number;
    nervous: number;
    surprised: number;
    tense: number;
    uncertain: number;
  };
  nervousScore: number;
  isNervous: boolean;
  samplesCaptured: number;
}

export interface QuestionPerformance {
  questionIndex: number;
  question: string;
  answer: string;
  score: number;
  feedback: string;
  correctness: "correct" | "partially-correct" | "incorrect" | "unknown";
  correctnessReason: string;
  startedAt: number;
  answeredAt: number;
  emotionalState: NervousMetrics;
  stammerMetrics: StammerMetrics;
}

export interface InterviewSessionReport {
  sessionId: string;
  roleId: string;
  roleTitle: string;
  startedAt: number;
  endedAt: number;
  totalQuestions: number;
  avgScore: number;
  nervousMoments: number;
  stammerMoments: number;
  questions: QuestionPerformance[];
  priorityTopics: string[];
}
