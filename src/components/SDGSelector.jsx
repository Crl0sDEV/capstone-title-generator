"use client";

import { motion } from "framer-motion";

const SDG_LIST = [
  { id: 1, label: "1. No Poverty", color: "bg-red-500" },
  { id: 2, label: "2. Zero Hunger", color: "bg-yellow-500" },
  { id: 3, label: "3. Good Health & Well-being", color: "bg-green-500" },
  { id: 4, label: "4. Quality Education", color: "bg-red-400" },
  { id: 5, label: "5. Gender Equality", color: "bg-orange-500" },
  { id: 6, label: "6. Clean Water & Sanitation", color: "bg-cyan-500" },
  { id: 7, label: "7. Affordable & Clean Energy", color: "bg-yellow-400" },
  { id: 8, label: "8. Decent Work & Economic Growth", color: "bg-red-700" },
  { id: 9, label: "9. Industry, Innovation & Infra", color: "bg-orange-600" },
  { id: 10, label: "10. Reduced Inequalities", color: "bg-pink-500" },
  { id: 11, label: "11. Sustainable Cities & Communities", color: "bg-orange-400" },
  { id: 12, label: "12. Responsible Consumption", color: "bg-yellow-600" },
  { id: 13, label: "13. Climate Action", color: "bg-green-700" },
  { id: 14, label: "14. Life Below Water", color: "bg-blue-500" },
  { id: 15, label: "15. Life on Land", color: "bg-green-600" },
  { id: 16, label: "16. Peace, Justice & Strong Inst.", color: "bg-blue-700" },
  { id: 17, label: "17. Partnerships for the Goals", color: "bg-blue-900" },
];

export default function SDGSelector({ sdg, setSdg }) {
  const selectedColor = SDG_LIST.find((s) => s.label === sdg)?.color || "bg-gray-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2 w-full"
    >
      <label className="text-sm font-semibold text-gray-700 flex justify-between items-center">
        <span>Target SDG (Optional)</span>
        <span className="text-[10px] sm:text-xs text-gray-400 font-normal">Select one</span>
      </label>

      <div className="relative w-full">
        <select
          value={sdg}
          onChange={(e) => setSdg(e.target.value)}
          className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 bg-white text-base sm:text-sm cursor-pointer text-gray-700 truncate"
        >
          <option value="">No specific SDG goal</option>
          {SDG_LIST.map((item) => (
            <option key={item.id} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-gray-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: sdg ? "auto" : 0, opacity: sdg ? 1 : 0 }}
        className="overflow-hidden"
      >
        {sdg && (
          <div className="mt-2">
            <span
              className={`inline-flex items-start sm:items-center gap-2 px-3 py-2 sm:py-1.5 rounded-lg sm:rounded-full text-xs font-medium text-white shadow-sm w-full sm:w-auto ${selectedColor}`}
            >
              <span className="shrink-0 mt-0.5 sm:mt-0">🎯</span>
              <span className="leading-tight break-words">{sdg}</span>
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}