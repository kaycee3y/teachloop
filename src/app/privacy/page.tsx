export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 text-gray-800">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: August 2026</p>

      <p className="mt-6">
        Teachloop is intended for learners aged 13 and up.
      </p>

      <h2 className="mt-6 font-semibold">What we collect</h2>
      <p className="mt-2">
        The topics or notes you submit, the explanations you type, and your in app progress
        (streak, points, hearts). During onboarding we also ask for your name, age range,
        education level, and a study preference, used only to personalize your greeting and
        experience. When you finish a lesson, a record of it (title, date, score, and points
        earned) is kept so you can see it in your lesson history. All of this is stored locally
        in your browser, not on a server we control, and lesson history older than 30 days is
        automatically removed.
      </p>

      <h2 className="mt-6 font-semibold">How it's used</h2>
      <p className="mt-2">
        Submitted text is sent to Groq's API solely to generate lessons and grade your
        explanations. We do not sell your data or use it for advertising. We do not currently
        collect accounts, emails, or payment information.
      </p>

      <h2 className="mt-6 font-semibold">Third party processing</h2>
      <p className="mt-2">
        Groq processes the text you submit as part of generating a response. Refer to Groq's
        own privacy policy for how they handle API request data.
      </p>

      <h2 className="mt-6 font-semibold">Your rights</h2>
      <p className="mt-2">
        Clearing your browser's local storage removes your locally stored progress, onboarding
        answers, and lesson history. To ask about data handling, contact us below.
      </p>

      <h2 className="mt-6 font-semibold">Contact</h2>
      <p className="mt-2">
        Privacy questions: <a className="text-primary underline" href="mailto:web3update3y@gmail.com">web3update3y@gmail.com</a>
      </p>
    </main>
  );
}