"use client";

import {
  ArrowLeft,
  Plus,
  Trophy,
  Footprints,
  Compass,
  Flame,
  CalendarCheck,
  Award,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HistoryEntry } from "@/types/path";

interface HistoryViewProps {
  onBack: () => void;
  onNewLesson: () => void;
}

const displayFont = { fontFamily: "var(--font-baloo)" };

function pruneAndLoad(): HistoryEntry[] {
  const raw = localStorage.getItem("teachloop_history");
  const existing: HistoryEntry[] = raw ? JSON.parse(raw) : [];
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const pruned = existing.filter((entry) => entry.completedAt >= thirtyDaysAgo);
  if (pruned.length !== existing.length) {
    localStorage.setItem("teachloop_history", JSON.stringify(pruned));
  }
  return pruned;
}

function formatDate(timestamp: number) {
  const days = Math.floor((Date.now() - timestamp) / (24 * 60 * 60 * 1000));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

const ACHIEVEMENTS = [
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Finish your first lesson",
    icon: Footprints,
    check: (entries: HistoryEntry[]) => entries.length >= 1,
  },
  {
    id: "three-topics",
    title: "Explorer",
    description: "Finish 3 different lessons",
    icon: Compass,
    check: (entries: HistoryEntry[]) => entries.length >= 3,
  },
  {
    id: "streak-3",
    title: "On a Roll",
    description: "Reach a 3 day streak",
    icon: Flame,
    check: (entries: HistoryEntry[], streak: number) => streak >= 3,
  },
  {
    id: "streak-7",
    title: "Dedicated",
    description: "Reach a 7 day streak",
    icon: CalendarCheck,
    check: (entries: HistoryEntry[], streak: number) => streak >= 7,
  },
  {
    id: "perfect-score",
    title: "Perfectionist",
    description: "Score 100 on a lesson",
    icon: Award,
    check: (entries: HistoryEntry[]) => entries.some((e) => e.averageScore === 100),
  },
  {
    id: "high-average",
    title: "High Scorer",
    description: "Average 80 or higher across your lessons",
    icon: Star,
    check: (entries: HistoryEntry[]) => {
      if (entries.length === 0) return false;
      const avg = entries.reduce((sum, e) => sum + e.averageScore, 0) / entries.length;
      return avg >= 80;
    },
  },
];

export default function HistoryView({ onBack, onNewLesson }: HistoryViewProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const [tab, setTab] = useState<"lessons" | "achievements">("lessons");

  useEffect(() => {
    setEntries(pruneAndLoad());
    const savedStreak = localStorage.getItem("teachloop_streak");
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  return (
    <main className="relative min-h-screen bg-surface-muted px-5 pb-24 pt-8">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <h1 style={displayFont} className="mt-4 text-xl font-semibold text-gray-900">
        Your lessons
      </h1>
      <p className="mt-1 text-xs text-gray-500">
        Only finished lessons show up here. If you exit before finishing, it will not be saved
        to history.
      </p>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setTab("lessons")}
          className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            tab === "lessons" ? "bg-primary text-white" : "bg-surface text-gray-600"
          }`}
        >
          Lessons
        </button>
        <button
          onClick={() => setTab("achievements")}
          className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            tab === "achievements" ? "bg-primary text-white" : "bg-surface text-gray-600"
          }`}
        >
          Achievements
        </button>
      </div>

      {tab === "lessons" ? (
        entries.length === 0 ? (
          <p className="mt-8 text-center text-sm text-gray-500">
            No lessons finished yet. Complete a path and it will show up here.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {entries.map((entry) => (
              <div key={entry.id} className="rounded-card bg-surface p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-900">{entry.pathTitle}</h2>
                    <p className="mt-1 text-xs text-gray-500">{formatDate(entry.completedAt)}</p>
                  </div>
                  <div className="flex items-center gap-1 text-accent-gold">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-semibold text-gray-800">{entry.averageScore}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">+{entry.pointsEarned} points earned</p>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = a.check(entries, streak);
            return (
              <div
                key={a.id}
                className={`rounded-card p-4 text-center shadow-sm ${
                  unlocked ? "bg-accent-gold-light" : "bg-surface"
                }`}
              >
                <span
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-2xl ${
                    unlocked ? "bg-accent-gold text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <a.icon className="h-5 w-5" />
                </span>
                <h3
                  className={`mt-3 text-sm font-semibold ${
                    unlocked ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {a.title}
                </h3>
                <p className={`mt-1 text-xs ${unlocked ? "text-gray-600" : "text-gray-400"}`}>
                  {a.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={onNewLesson}
        className="fixed bottom-8 right-6 flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-primary text-white shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </button>
    </main>
  );
}