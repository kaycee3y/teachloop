"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Heart } from "lucide-react";
import { PathNode } from "@/types/path";

interface QuizViewProps {
  node: PathNode;
  hearts: number;
  onAnswer: (correct: boolean) => void;
  onComplete: () => void;
  onExit: () => void;
}

const displayFont = { fontFamily: "var(--font-baloo)" };

export default function QuizView({ node, hearts, onAnswer, onComplete, onExit }: QuizViewProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const question = node.questions[questionIndex];
  const isLast = questionIndex === node.questions.length - 1;

  function handleSelect(index: number) {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    onAnswer(index === question.correctIndex);
  }

  function handleContinue() {
    if (isLast) {
      onComplete();
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  if (hearts <= 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-surface-muted px-6 text-center">
        <h1 style={displayFont} className="text-2xl font-semibold text-gray-900">Out of hearts</h1>
        <p className="mt-2 max-w-xs text-sm text-gray-600">
          Come back and review this node again, hearts refill next time you start a path.
        </p>
        <button
          onClick={onExit}
          className="mt-6 rounded-pill bg-primary px-6 py-3 text-sm font-medium text-white"
        >
          Back to path
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface-muted px-5 pb-10 pt-8">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-sm text-gray-500">
          &larr; Exit
        </button>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
            <Heart className="h-4 w-4 fill-red-400 text-red-400" /> {hearts}
          </span>
          <span className="text-xs font-medium text-gray-500">
            {questionIndex + 1} / {node.questions.length}
          </span>
        </div>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((questionIndex + (revealed ? 1 : 0)) / node.questions.length) * 100}%` }}
        />
      </div>

      <h1 style={displayFont} className="mt-8 text-xl font-semibold text-gray-900">
        {question.question}
      </h1>

      <div className="mt-6 space-y-3">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isSelected = index === selected;

          let stateClasses = "border-gray-200 bg-surface";
          if (revealed && isCorrect) {
            stateClasses = "border-success bg-success-light";
          } else if (revealed && isSelected && !isCorrect) {
            stateClasses = "border-red-300 bg-red-50";
          } else if (isSelected) {
            stateClasses = "border-primary bg-primary-light";
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(index)}
              disabled={revealed}
              className={`flex w-full items-center justify-between rounded-pill border-2 px-5 py-3 text-left text-sm font-medium text-gray-800 transition-all duration-200 ease-out ${stateClasses}`}
            >
              {option}
              {revealed && isCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
              {revealed && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400" />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <button
          onClick={handleContinue}
          className="mt-8 w-full rounded-pill bg-primary py-3 font-medium text-white shadow-sm"
        >
          {isLast ? "Finish" : "Continue"}
        </button>
      )}
    </main>
  );
}
