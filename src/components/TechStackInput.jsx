"use client";

export default function TechStackInput({ techstack, setTechstack }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Preferred Tech Stack (Optional):
      </label>

      <input
        type="text"
        placeholder="e.g., React, Laravel, Firebase"
        className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 bg-white text-base sm:text-sm cursor-pointer text-gray-700 truncate"
        value={techstack}
        onChange={(e) => setTechstack(e.target.value)}
      />
    </div>
  );
}
