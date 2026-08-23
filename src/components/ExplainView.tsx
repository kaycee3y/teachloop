"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { PathNode, GradeResult } from "@/types/path";

interface ExplainViewProps {
  node: PathNode;
  onComplete: (result: GradeResult) => void;
  onExit: () => void;
}

const displayFont = { fontFamily: "var(--font-baloo)" };

export default function ExplainView({ node, onComplete, onExit }: ExplainViewProps) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GradeResult | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/grade-explanation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: node.summary, explanation }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <main className="min-h-screen bg-surface-muted px-5 pb-10 pt-8">
        <div className="animate-fade-up rounded-card bg-gradient-to-b from-gradient-start to-gradient-end p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-gray-700">Your score</p>
          <p style={displayFont} className="mt-1 text-5xl font-bold text-gray-900">
            {result.score}
          </p>
          <p className="mt-2 text-sm text-gray-700">{result.feedback}</p>
        </div>

        {result.hits.length > 0 && (
          <div className="mt-5 rounded-card bg-success-light p-5">
            <h2 className="flex items-center gap-2 font-semibold text-gray-900">
              <CheckCircle2 className="h-5 w-5 text-success" /> What you nailed
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {result.hits.map((hit) => (
                <li key={hit}>{hit}</li>
              ))}
            </ul>
          </div>
        )}

        {result.gaps.length > 0 && (
          <div className="mt-4 rounded-card bg-accent-gold-light p-5">
            <h2 className="flex items-center gap-2 font-semibold text-gray-900">
              <Sparkles className="h-5 w-5 text-accent-gold" /> Worth another look
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {result.gaps.map((gap) => (
                <li key={gap}>{gap}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => onComplete(result)}
          className="mt-6 w-full rounded-pill bg-primary py-3 font-medium text-white shadow-sm"
        >
          Continue
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface-muted px-5 pb-10 pt-8">
      <button onClick={onExit} className="text-sm text-gray-500">
        &larr; Exit
      </button>
      <h1 style={displayFont} className="mt-4 text-xl font-semibold text-gray-900">
        {node.explainPrompt}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        No pressure, write it like you&apos;re explaining it to a friend.
      </p>
      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        rows={8}
        placeholder="Start typing your explanation..."
        className="mt-4 w-full rounded-2xl border border-gray-200 bg-surface p-4 text-sm text-gray-800 focus:border-primary focus:outline-none"
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading || explanation.trim().length < 10}
        className="mt-4 w-full rounded-pill bg-primary py-3 font-medium text-white transition disabled:opacity-40"
      >
        {loading ? "Grading..." : "Submit explanation"}
      </button>
    </main>
  );
}