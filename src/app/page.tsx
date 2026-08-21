"use client";

import { useState } from "react";
import LandingView from "@/components/LandingView";
import ConsentGate from "@/components/ConsentGate";
import HomeView from "@/components/HomeView";
import SkillPathView from "@/components/SkillPathView";
import { LearningPath } from "@/types/path";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [path, setPath] = useState<LearningPath | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [streak] = useState(0);
  const [points] = useState(0);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!started) {
    return <LandingView onGetStarted={() => setStarted(true)} />;
  }

  return (
    <ConsentGate>
      {path ? (
        <SkillPathView
          path={path}
          activeIndex={activeIndex}
          onStartNode={(index) => {
            // Day 3 wires this to the real quiz screen, placeholder for now
            console.log("start node", index);
          }}
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
