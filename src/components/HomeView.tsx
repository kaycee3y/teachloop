import { Flame, Star } from "lucide-react";

interface HomeViewProps {
  streak: number;
  points: number;
  topic: string;
  onTopicChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}

function timeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

const displayFont = { fontFamily: "var(--font-baloo)" };

export default function HomeView({
  streak,
  points,
  topic,
  onTopicChange,
  onSubmit,
  loading,
  error,
}: HomeViewProps) {
  return (
    <main className="min-h-screen bg-surface-muted px-5 pb-10 pt-8">
      <div className="rounded-card bg-gradient-to-b from-gradient-start to-gradient-end px-6 py-8 text-center shadow-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-pill bg-white/60 px-3 py-1.5">
            <Flame className="h-4 w-4 fill-accent-coral text-accent-coral" />
            <span className="text-sm font-semibold text-gray-800">{streak}</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-pill bg-white/60 px-3 py-1.5">
            <Star className="h-4 w-4 fill-accent-gold text-accent-gold" />
            <span className="text-sm font-semibold text-gray-800">{points}</span>
          </span>
        </div>
        <h1 style={displayFont} className="mt-6 text-2xl font-semibold text-gray-900">Good {timeOfDay()}</h1>
        <p className="mt-1 text-sm text-gray-600">What do you want to master today?</p>
      </div>

      <div className="mt-6 rounded-card bg-surface p-5 shadow-sm">
        <label className="text-sm font-medium text-gray-700">Paste a topic or your notes</label>
        <textarea
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          rows={5}
          placeholder="e.g. Photosynthesis, the French Revolution, how React hooks work..."
          className="mt-2 w-full rounded-2xl border border-gray-200 p-3 text-sm text-gray-800 focus:border-primary focus:outline-none"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button
          onClick={onSubmit}
          disabled={loading || topic.trim().length < 3}
          className="mt-4 w-full rounded-pill bg-primary py-3 font-medium text-white transition disabled:opacity-40"
        >
          {loading ? "Building your path..." : "Build my path"}
        </button>
      </div>
    </main>
  );
}