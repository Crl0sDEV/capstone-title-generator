"use client";

export default function TechStackInput({ techstack, setTechstack }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Preferred Tech Stack:
      </label>

      <input
        type="text"
        placeholder="e.g., React, Laravel, Firebase"
        className="w-full p-3 border rounded-xl bg-[#fafafa] focus:ring-2 focus:ring-black transition"
        value={techstack}
        onChange={(e) => setTechstack(e.target.value)}
      />
    </div>
  );
}
