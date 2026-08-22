import { Trophy } from "lucide-react";

interface PathCompleteViewProps {
  pathTitle: string;
  averageScore: number;
  pointsEarned: number;
  onDone: () => void;
}

const displayFont = { fontFamily: "var(--font-baloo)" };

export default function PathCompleteView({
  pathTitle,
  averageScore,
  pointsEarned,
  onDone,
}: PathCompleteViewProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gradient-start to-gradient-end px-6 text-center">
      <div className="animate-fade-up flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-sm">
        <Trophy className="h-10 w-10" />
      </div>
      <h1 style={displayFont} className="mt-6 text-2xl font-semibold text-gray-900">
        Path complete
      </h1>
      <p className="mt-1 text-sm text-gray-700">{pathTitle}</p>

      <div className="mt-6 flex gap-4">
        <div className="rounded-card bg-surface px-6 py-4 shadow-sm">
          <p style={displayFont} className="text-2xl font-bold text-gray-900">
            {averageScore}
          </p>
          <p className="mt-1 text-xs text-gray-500">Avg mastery</p>
        </div>
        <div className="rounded-card bg-surface px-6 py-4 shadow-sm">
          <p style={displayFont} className="text-2xl font-bold text-gray-900">
            +{pointsEarned}
          </p>
          <p className="mt-1 text-xs text-gray-500">Points earned</p>
        </div>
      </div>

      <button
        onClick={onDone}
        className="mt-8 rounded-pill bg-primary px-8 py-3 font-medium text-white shadow-sm"
      >
        Start a new topic
      </button>
    </main>
  );
}