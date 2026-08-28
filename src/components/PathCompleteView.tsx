import { Trophy, Sparkles, Star } from "lucide-react";

interface PathCompleteViewProps {
  pathTitle: string;
  averageScore: number;
  pointsEarned: number;
  onDone: () => void;
}

const displayFont = { fontFamily: "var(--font-baloo)" };

const CONFETTI = [
  { Icon: Star, className: "left-2 top-0 h-4 w-4 text-accent-gold rotate-12" },
  { Icon: Sparkles, className: "right-4 top-4 h-5 w-5 text-accent-coral -rotate-12" },
  { Icon: Star, className: "left-10 bottom-2 h-3 w-3 text-success rotate-45" },
  { Icon: Sparkles, className: "right-0 bottom-6 h-4 w-4 text-primary rotate-6" },
  { Icon: Star, className: "-left-4 top-10 h-3 w-3 text-accent-coral -rotate-6" },
  { Icon: Sparkles, className: "right-10 -top-2 h-3 w-3 text-accent-gold rotate-12" },
];

export default function PathCompleteView({
  pathTitle,
  averageScore,
  pointsEarned,
  onDone,
}: PathCompleteViewProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gradient-start to-gradient-end px-6 text-center">
      <div className="relative">
        {CONFETTI.map((c, i) => (
          <c.Icon key={i} className={`absolute ${c.className}`} />
        ))}
        <div className="animate-fade-up flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-sm">
          <Trophy className="h-10 w-10" />
        </div>
      </div>
      <h1 style={displayFont} className="mt-6 text-3xl font-extrabold text-gray-900">
        Great job!
      </h1>
      <p className="mt-1 text-sm text-gray-700">You finished {pathTitle}</p>

      <div className="mt-6 flex gap-4">
        <div className="rounded-card bg-accent-gold-light px-6 py-4 shadow-sm">
          <p style={displayFont} className="text-2xl font-bold text-gray-900">
            {averageScore}
          </p>
          <p className="mt-1 text-xs text-gray-600">Avg mastery</p>
        </div>
        <div className="rounded-card bg-accent-coral-light px-6 py-4 shadow-sm">
          <p style={displayFont} className="text-2xl font-bold text-gray-900">
            +{pointsEarned}
          </p>
          <p className="mt-1 text-xs text-gray-600">Points earned</p>
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