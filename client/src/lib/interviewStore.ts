import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { InterviewSessionReport } from "@/lib/interviewReport";

export interface StoredInterviewReport extends InterviewSessionReport {
  id: string;
}

function normalizeStoredReport(id: string, data: Record<string, unknown>): StoredInterviewReport | null {
  const startedAt = Number(data.startedAt ?? 0);
  const endedAt = Number(data.endedAt ?? 0);
  const avgScore = Number(data.avgScore ?? 0);
  const totalQuestions = Number(data.totalQuestions ?? 0);

  if (!Number.isFinite(startedAt) || !Number.isFinite(endedAt)) return null;

  return {
    id,
    sessionId: String(data.sessionId ?? id),
    roleId: String(data.roleId ?? "unknown-role"),
    roleTitle: String(data.roleTitle ?? "Interview"),
    startedAt,
    endedAt,
    totalQuestions,
    avgScore,
    nervousMoments: Number(data.nervousMoments ?? 0),
    stammerMoments: Number(data.stammerMoments ?? 0),
    questions: Array.isArray(data.questions) ? (data.questions as InterviewSessionReport["questions"]) : [],
    priorityTopics: Array.isArray(data.priorityTopics)
      ? (data.priorityTopics as string[])
      : [],
  };
}

export async function saveInterviewReport(
  userId: string,
  report: InterviewSessionReport,
): Promise<string | null> {
  if (!isFirebaseConfigured || !db) return null;

  const interviewsRef = collection(db, "users", userId, "interviews");
  const docRef = await addDoc(interviewsRef, {
    ...report,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getInterviewReports(
  userId: string,
  maxRows = 25,
): Promise<StoredInterviewReport[]> {
  if (!isFirebaseConfigured || !db) return [];

  const interviewsRef = collection(db, "users", userId, "interviews");
  const interviewsQuery = query(interviewsRef, orderBy("endedAt", "desc"), limit(maxRows));
  const snapshot = await getDocs(interviewsQuery);

  return snapshot.docs
    .map((docSnap) => normalizeStoredReport(docSnap.id, docSnap.data() as Record<string, unknown>))
    .filter((item): item is StoredInterviewReport => item !== null);
}

export async function deleteInterviewReport(
  userId: string,
  reportId: string,
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const reportRef = doc(db, "users", userId, "interviews", reportId);
    await deleteDoc(reportRef);
    return true;
  } catch (error) {
    console.error("Failed to delete interview report:", error);
    return false;
  }
}
