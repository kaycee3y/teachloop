"use client";

import { useState } from "react";
import LandingView from "@/components/LandingView";
import ConsentGate from "@/components/ConsentGate";
import HomeView from "@/components/HomeView";
import SkillPathView from "@/components/SkillPathView";
import QuizView from "@/components/QuizView";
import { LearningPath } from "@/types/path";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [path, setPath] = useState<LearningPath | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quizzingIndex, setQuizzingIndex] = useState<number | null>(null);
  const [streak] = useState(0);
  const [points, setPoints] = useState(0);
  const [hearts, setHearts] = useState(5);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setPath(data);
      setActiveIndex(0);
      setHearts(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(correct: boolean) {
    if (correct) {
      setPoints((p) => p + 10);
    } else {
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function handleQuizComplete() {
    if (quizzingIndex !== null && quizzingIndex === activeIndex) {
      setActiveIndex((i) => i + 1);
    }
    setQuizzingIndex(null);
  }

  if (!started) {
    return <LandingView onGetStarted={() => setStarted(true)} />;
  }

  return (
    <ConsentGate>
      {path && quizzingIndex !== null ? (
        <QuizView
          node={path.nodes[quizzingIndex]}
          hearts={hearts}
          onAnswer={handleAnswer}
          onComplete={handleQuizComplete}
          onExit={() => setQuizzingIndex(null)}
        />
      ) : path ? (
        <SkillPathView
          path={path}
          activeIndex={activeIndex}
          onStartNode={(index) => setQuizzingIndex(index)}
          onBack={() => {
            setPath(null);
            setTopic("");
          }}
        />
      ) : (
        <HomeView
          streak={streak}
          points={points}
          topic={topic}
          onTopicChange={setTopic}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      )}
    </ConsentGate>
  );
}
