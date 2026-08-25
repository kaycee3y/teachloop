"use client";

import { useState, useEffect } from "react";
import LandingView from "@/components/LandingView";
import ConsentGate from "@/components/ConsentGate";
import OnboardingView from "@/components/OnboardingView";
import HomeView from "@/components/HomeView";
import SkillPathView from "@/components/SkillPathView";
import QuizView from "@/components/QuizView";
import ExplainView from "@/components/ExplainView";
import PathCompleteView from "@/components/PathCompleteView";
import { LearningPath, GradeResult } from "@/types/path";

interface Profile {
  name: string;
  ageRange: string;
  education: string;
  vibe: string;
}

export default function Page() {
  const [started, setStarted] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [path, setPath] = useState<LearningPath | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [workingIndex, setWorkingIndex] = useState<number | null>(null);
  const [stage, setStage] = useState<"quiz" | "explain">("quiz");
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [pathPoints, setPathPoints] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [nodeScores, setNodeScores] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const savedPoints = localStorage.getItem("teachloop_points");
    const savedStreak = localStorage.getItem("teachloop_streak");
    const savedProfile = localStorage.getItem("teachloop_profile");
    const savedActivePath = localStorage.getItem("teachloop_active_path");
    if (savedPoints) setPoints(Number(savedPoints));
    if (savedStreak) setStreak(Number(savedStreak));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedActivePath) {
      const restored = JSON.parse(savedActivePath);
      setPath(restored.path);
      setActiveIndex(restored.activeIndex);
      setNodeScores(restored.nodeScores);
      setPathPoints(restored.pathPoints);
      setHearts(restored.hearts);
      setTopic(restored.topic);
    }
    setProfileLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("teachloop_points", String(points));
  }, [points]);

  useEffect(() => {
    if (!path) return;
    localStorage.setItem(
      "teachloop_active_path",
      JSON.stringify({ path, activeIndex, nodeScores, pathPoints, hearts, topic })
    );
  }, [path, activeIndex, nodeScores, pathPoints, hearts, topic]);

  function handleOnboardingComplete(p: Profile) {
    setProfile(p);
    localStorage.setItem("teachloop_profile", JSON.stringify(p));
  }

  function recordActivity() {
    const today = new Date().toISOString().split("T")[0];
    const lastActive = localStorage.getItem("teachloop_last_active");
    let newStreak = 1;
    if (lastActive) {
      const diffDays = Math.round(
        (new Date(today).getTime() - new Date(lastActive).getTime()) / 86400000
      );
      if (diffDays === 0) {
        newStreak = streak || 1;
      } else if (diffDays === 1) {
        newStreak = streak + 1;
      } else {
        newStreak = 1;
      }
    }
    setStreak(newStreak);
    localStorage.setItem("teachloop_last_active", today);
    localStorage.setItem("teachloop_streak", String(newStreak));
  }

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
      setPathPoints(0);
      setNodeScores({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(correct: boolean) {
    if (correct) {
      setPoints((p) => p + 10);
      setPathPoints((p) => p + 10);
    } else {
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function handleQuizComplete() {
    setStage("explain");
  }

  function handleExplainComplete(result: GradeResult) {
    const bonus = Math.round(result.score / 5);
    setPoints((p) => p + bonus);
    setPathPoints((p) => p + bonus);

    if (workingIndex !== null) {
      setNodeScores((scores) => ({ ...scores, [workingIndex]: result.score }));

      if (workingIndex === activeIndex) {
        const nextIndex = workingIndex + 1;
        setActiveIndex(nextIndex);
        if (path && nextIndex >= path.nodes.length) {
          recordActivity();
        }
      }
    }
    setWorkingIndex(null);
    setStage("quiz");
  }

  function exitWork() {
    setWorkingIndex(null);
    setStage("quiz");
    if (hearts <= 0) {
      setHearts(5);
    }
  }

  function startNewTopic() {
    setPath(null);
    setTopic("");
    setActiveIndex(0);
    setNodeScores({});
    setPathPoints(0);
    localStorage.removeItem("teachloop_active_path");
  }

  if (!started) {
    return <LandingView onGetStarted={() => setStarted(true)} />;
  }

  const scores = Object.values(nodeScores);
  const averageScore =
    scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <ConsentGate>
      {!profileLoaded ? null : !profile ? (
        <OnboardingView onComplete={handleOnboardingComplete} />
      ) : path && workingIndex !== null && stage === "quiz" ? (
        <QuizView
          node={path.nodes[workingIndex]}
          hearts={hearts}
          onAnswer={handleAnswer}
          onComplete={handleQuizComplete}
          onExit={exitWork}
        />
      ) : path && workingIndex !== null && stage === "explain" ? (
        <ExplainView
          node={path.nodes[workingIndex]}
          onComplete={handleExplainComplete}
          onExit={exitWork}
        />
      ) : path && activeIndex >= path.nodes.length ? (
        <PathCompleteView
          pathTitle={path.pathTitle}
          averageScore={averageScore}
          pointsEarned={pathPoints}
          onDone={startNewTopic}
        />
      ) : path ? (
        <SkillPathView
          path={path}
          activeIndex={activeIndex}
          onStartNode={(index) => {
            setWorkingIndex(index);
            setStage("quiz");
          }}
          onBack={startNewTopic}
        />
      ) : (
        <HomeView
          name={profile.name}
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