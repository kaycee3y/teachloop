export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 text-gray-800">
      <h1 className="text-2xl font-semibold">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: August 2026</p>

      <p className="mt-6">
        Teachloop is a student hackathon project built for the Prometheus August AI Challenge.
        By using it, you agree to the following terms.
      </p>

      <h2 className="mt-6 font-semibold">What Teachloop does</h2>
      <p className="mt-2">
        You submit a topic or your own notes. Teachloop uses a third party AI service (Groq)
        to generate a short learning path, quiz questions, and to grade explanations you write
        in your own words. Generated content is AI produced and may contain errors. Teachloop
        is a study aid, not a substitute for a teacher, textbook, or formal instruction.
      </p>

      <h2 className="mt-6 font-semibold">Your content</h2>
      <p className="mt-2">
        Any topic, notes, or explanation text you submit is sent to Groq's API to generate a
        response. Do not submit sensitive personal information, private data belonging to
        others, or anything you would not want processed by a third party AI service.
      </p>

      <h2 className="mt-6 font-semibold">No warranty</h2>
      <p className="mt-2">
        Teachloop is provided as is, built for a hackathon, with no guarantee of accuracy,
        availability, or fitness for any particular purpose.
      </p>

      <h2 className="mt-6 font-semibold">Changes</h2>
      <p className="mt-2">
        These terms may change as the project develops. Continued use after a change means
        you accept the update.
      </p>

      <h2 className="mt-6 font-semibold">Contact</h2>
      <p className="mt-2">
        Questions: <a className="text-primary underline" href="mailto:web3update3y@gmail.com">web3update3y@gmail.com</a>
      </p>
    </main>
  );
}
