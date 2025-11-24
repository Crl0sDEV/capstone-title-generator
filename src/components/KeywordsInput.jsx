"use client";

export default function KeywordsInput({ keywords, setKeywords }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Keywords (optional):
      </label>
      <input
        type="text"
        placeholder="e.g., AI, Web, System"
        className="w-full p-3 border rounded-xl bg-[#fafafa] focus:ring-2 focus:ring-black transition"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
    </div>
  );
}
