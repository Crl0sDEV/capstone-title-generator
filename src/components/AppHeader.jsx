"use client";

export default function AppHeader({ showInfo, setShowInfo, setShowAbout }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-semibold tracking-tight mb-2">
        Capstone Title Generator
      </h1>

      <button
        onClick={() => setShowInfo(!showInfo)}
        className="text-sm text-gray-500 hover:text-black underline decoration-dotted underline-offset-4 transition"
      >
        How it works & Limits
      </button>

      <button
        onClick={() => setShowAbout(true)}
        className="ml-4 text-sm text-gray-500 hover:text-black underline decoration-dotted underline-offset-4 transition"
      >
        About
      </button>
    </div>
  );
}
