"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "teachloop_terms_accepted";

export default function ConsentGate({ children }: { children: React.ReactNode }) {
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAccepted(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  if (accepted === null) return null;
  if (accepted) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-sm rounded-card bg-surface p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">Before you start</h2>
        <p className="mt-2 text-sm text-gray-600">
          Teachloop uses AI to generate lessons and grade your answers. Read the{" "}
          <Link href="/terms" className="text-primary underline">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>{" "}
          before continuing.
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5"
          />
          I agree to the Terms of Service and Privacy Policy
        </label>
        <button
          disabled={!checked}
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, "true");
            setAccepted(true);
          }}
          className="mt-4 w-full rounded-pill bg-primary py-3 font-medium text-white disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
