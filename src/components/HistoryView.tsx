"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Trophy } from "lucide-react";
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

export default function HistoryView({ onBack, onNewLesson }: HistoryViewProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(pruneAndLoad());
  }, []);

  return (
    <main className="relative min-h-screen bg-surface-muted px-5 pb-24 pt-8">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <h1 style={displayFont} className="mt-4 text-xl font-semibold text-gray-900">
        Your lessons
      </h1>

      {entries.length === 0 ? (
        <p className="mt-8 text-center text-sm text-gray-500">
          No lessons finished yet. Complete a path and it&apos;ll show up here.
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