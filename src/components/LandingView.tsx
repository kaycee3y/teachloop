import { Pin } from "lucide-react";

interface LandingViewProps {
  onGetStarted: () => void;
}

const displayFont = { fontFamily: "var(--font-baloo)" };

const STEPS = [
  {
    number: "01",
    title: "Paste a topic",
    description: "Drop in your notes or just type what you're trying to learn.",
    cardClass: "bg-accent-coral-light",
    pinClass: "bg-accent-coral",
    numberClass: "text-accent-coral",
    align: "ml-0",
  },
  {
    number: "02",
    title: "Quiz and explain",
    description: "Answer quick questions, then explain the idea back in your own words.",
    cardClass: "bg-accent-gold-light",
    pinClass: "bg-accent-gold",
    numberClass: "text-accent-gold",
    align: "ml-auto",
  },
  {
    number: "03",
    title: "See your gaps",
    description: "Get graded on what you actually understand, not just what you memorized.",
    cardClass: "bg-success-light",
    pinClass: "bg-success",
    numberClass: "text-success",
    align: "ml-0",
  },
];

export default function LandingView({ onGetStarted }: LandingViewProps) {
  return (
    <main className="min-h-screen bg-surface">
      <header className="flex items-center justify-between px-6 py-5">
        <span style={displayFont} className="text-lg font-semibold text-gray-900">Teachloop</span>
        <button
          onClick={onGetStarted}
          className="rounded-pill bg-primary px-5 py-2 text-sm font-medium text-white"
        >
          Get started
        </button>
      </header>

      <section className="rounded-b-[64px] bg-gradient-to-b from-gradient-start to-gradient-end px-6 pb-20 pt-10 text-center">
        <h1 style={displayFont} className="mx-auto max-w-xs text-4xl font-semibold leading-tight text-gray-900">
          Learn it until you can teach it
        </h1>
        <p className="mx-auto mt-4 max-w-xs text-sm text-gray-700">
          Paste any topic or your own notes. Teachloop turns it into a bite sized path, quizzes
          you, and grades how well you can explain it back.
        </p>
        <button
          onClick={onGetStarted}
          className="mt-8 rounded-pill bg-primary px-8 py-3 font-medium text-white shadow-sm"
        >
          Get started, it&apos;s free
        </button>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 style={displayFont} className="text-center text-xl font-semibold text-gray-900">How it works</h2>
        <div className="mt-10 flex flex-col">
          {STEPS.map((s, i) => (
            <div key={s.number}>
              <div
                className={`relative w-[82%] ${s.align} animate-fade-up`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span
                  className={`absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full ${s.pinClass} text-white shadow-md`}
                >
                  <Pin className="h-4 w-4" />
                </span>
                <div className={`rounded-card ${s.cardClass} p-6 pt-8 shadow-sm`}>
                  <p className={`text-sm font-bold ${s.numberClass}`}>{s.number}</p>
                  <h3 className="mt-2 font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{s.description}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-auto my-3 h-6 w-px border-l-2 border-dashed border-gray-300" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[48px] bg-gradient-to-b from-gradient-end to-gradient-start px-6 py-14 text-center">
        <h2 style={displayFont} className="text-xl font-semibold text-gray-900">
          Quizzes tell you what you remember.
          <br />
          Explaining tells you what you understand.
        </h2>
        <p className="mx-auto mt-4 max-w-xs text-sm text-gray-700">
          Teachloop is built around the idea that if you can&apos;t explain something simply,
          you don&apos;t know it yet. Every path ends with a real explanation, graded on
          substance, not just keywords.
        </p>
      </section>

      <section className="px-6 py-16 text-center">
        <h2 style={displayFont} className="text-xl font-semibold text-gray-900">
          Ready to actually understand it?
        </h2>
        <p className="mt-2 text-sm text-gray-600">Pick anything you&apos;re studying and put it to the test.</p>
        <button
          onClick={onGetStarted}
          className="mt-6 rounded-pill bg-primary px-8 py-3 font-medium text-white shadow-sm"
        >
          Get started
        </button>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8 text-center text-xs text-gray-500">
        <p>Teachloop &middot; a student hackathon project</p>
        <p className="mt-2">
          <a href="/terms" className="underline">Terms</a> &middot;{" "}
          <a href="/privacy" className="underline">Privacy</a> &middot;{" "}
          <a href="mailto:web3update3y@gmail.com" className="underline">
            web3update3y@gmail.com
          </a>
        </p>
      </footer>
    </main>
  );
}