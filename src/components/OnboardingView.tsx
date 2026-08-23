"use client";

import { useState } from "react";

interface Profile {
  name: string;
  ageRange: string;
  education: string;
  vibe: string;
}

interface OnboardingViewProps {
  onComplete: (profile: Profile) => void;
}

const displayFont = { fontFamily: "var(--font-baloo)" };

const AGE_RANGES = ["13-17", "18-24", "25-34", "35+"];
const EDUCATION_LEVELS = ["High school", "Undergrad", "Postgrad", "Self-taught"];
const VIBES = ["Night owl", "Early bird", "Last minute cram", "Steady and slow"];

const STEPS = ["name", "age", "education", "vibe"] as const;

export default function OnboardingView({ onComplete }: OnboardingViewProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [education, setEducation] = useState("");
  const [vibe, setVibe] = useState("");

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  function canContinue() {
    if (step === "name") return name.trim().length > 0;
    if (step === "age") return ageRange !== "";
    if (step === "education") return education !== "";
    return vibe !== "";
  }

  function handleContinue() {
    if (isLast) {
      onComplete({ name: name.trim(), ageRange, education, vibe });
      return;
    }
    setStepIndex((i) => i + 1);
  }

  return (
    <main className="flex min-h-screen flex-col justify-between bg-surface-muted px-6 py-8">
      <div>
        <div className="flex justify-center gap-2">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 w-8 rounded-pill transition-colors duration-300 ${
                i <= stepIndex ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="mt-10">
          {step === "name" && (
            <>
              <h1 style={displayFont} className="text-2xl font-semibold text-gray-900">
                What should we call you?
              </h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-6 w-full rounded-2xl border border-gray-200 bg-surface p-4 text-sm text-gray-800 focus:border-primary focus:outline-none"
              />
            </>
          )}

          {step === "age" && (
            <>
              <h1 style={displayFont} className="text-2xl font-semibold text-gray-900">
                How old are you?
              </h1>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {AGE_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => setAgeRange(range)}
                    className={`rounded-pill border-2 py-3 text-sm font-medium transition-colors duration-200 ${
                      ageRange === range
                        ? "border-primary bg-primary-light text-gray-900"
                        : "border-gray-200 bg-surface text-gray-700"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "education" && (
            <>
              <h1 style={displayFont} className="text-2xl font-semibold text-gray-900">
                What&apos;s your education level?
              </h1>
              <div className="mt-6 space-y-3">
                {EDUCATION_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setEducation(level)}
                    className={`w-full rounded-pill border-2 py-3 text-sm font-medium transition-colors duration-200 ${
                      education === level
                        ? "border-primary bg-primary-light text-gray-900"
                        : "border-gray-200 bg-surface text-gray-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "vibe" && (
            <>
              <h1 style={displayFont} className="text-2xl font-semibold text-gray-900">
                What&apos;s your study vibe?
              </h1>
              <div className="mt-6 space-y-3">
                {VIBES.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibe(v)}
                    className={`w-full rounded-pill border-2 py-3 text-sm font-medium transition-colors duration-200 ${
                      vibe === v
                        ? "border-primary bg-primary-light text-gray-900"
                        : "border-gray-200 bg-surface text-gray-700"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!canContinue()}
        className="w-full rounded-pill bg-primary py-3 font-medium text-white transition disabled:opacity-40"
      >
        {isLast ? "Let's go" : "Continue"}
      </button>
    </main>
  );
}