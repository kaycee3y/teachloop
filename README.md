# Teachloop

**Learn it until you can teach it.**

Paste any topic or your own notes. Teachloop turns it into a bite sized learning path, quizzes you, and then grades how well you can explain it back in your own words.

## The problem

Most study apps stop at quizzes. Quizzes measure recall, they don't measure understanding, and it's easy to pass a multiple choice question on a concept you couldn't actually explain to another person. Teachloop is built around the Feynman technique: if you can't explain something simply, you don't know it yet.

## What it does

- **Paste a topic or your own notes.** Teachloop uses AI to break it into a short skill path, three to five bite sized nodes, ordered from foundational to advanced.
- **Quiz yourself.** Each node has quick multiple choice questions, hearts and points, familiar gamified mechanics.
- **Explain it back.** After the quiz, you write the concept in your own words, no multiple choice to lean on.
- **Get graded on substance.** An AI grader compares your explanation against the concept, and shows exactly what you nailed and what's still a gap, not just a score.
- **See your mastery, not just your streak.** Finishing a path shows an average mastery score across every node's grading, alongside points earned.
- **A quick personalized onboarding** collects your name, age range, education level, and study vibe, and greets you by name from then on.

## How it works

1. Paste a topic
2. Quiz and explain
3. See your gaps

## Tech stack

- **Next.js** (App Router, TypeScript, Tailwind CSS v4)
- **Groq API** (`openai/gpt-oss-120b`) for path generation and explanation grading
- **lucide-react** for iconography
- Deployed on **Vercel**



## Built for

Prometheus August AI Challenge, an educational AI/ML tool built to make learning more accessible, engaging, and personalized.

## Getting started locally

```bash
git clone https://github.com/kaycee3y/teachloop.git
cd teachloop
npm install
```

Create a `.env.local` file with your Groq API key:

```

Then run:

```bash
npm run dev
```

## License

Built for a hackathon submission. Not currently licensed for reuse.
