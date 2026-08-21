import { LearningPath } from "@/types/path";

interface SkillPathViewProps {
  path: LearningPath;
  activeIndex: number;
  onStartNode: (index: number) => void;
  onBack: () => void;
}

const displayFont = { fontFamily: "var(--font-baloo)" };

export default function SkillPathView({
  path,
  activeIndex,
  onStartNode,
  onBack,
}: SkillPathViewProps) {
  return (
    <main className="min-h-screen bg-surface-muted px-5 pb-10 pt-8">
      <button onClick={onBack} className="text-sm text-gray-500">
        &larr; New topic
      </button>
      <h1 style={displayFont} className="mt-3 text-xl font-semibold text-gray-900">{path.pathTitle}</h1>

      <div className="mt-6 space-y-4">
        {path.nodes.map((node, index) => {
          const locked = index > activeIndex;
          const done = index < activeIndex;
          return (
            <div
              key={node.id}
              className={`rounded-card p-5 shadow-sm ${locked ? "bg-gray-100" : "bg-surface"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${done ? "text-primary" : "text-gray-400"}`}>
                    {done ? "Completed" : `Step ${index + 1}`}
                  </p>
                  <h2 className={`mt-1 font-semibold ${locked ? "text-gray-400" : "text-gray-900"}`}>
                    {node.title}
                  </h2>
                </div>
                {!locked && (
                  <button
                    onClick={() => onStartNode(index)}
                    className="rounded-pill bg-primary px-4 py-2 text-sm font-medium text-white"
                  >
                    {done ? "Review" : "Start"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
