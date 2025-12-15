"use client";

import { motion } from "framer-motion";

const SDG_LIST = [
  { id: 1, label: "1. No Poverty" },
  { id: 2, label: "2. Zero Hunger" },
  { id: 3, label: "3. Good Health & Well-being" },
  { id: 4, label: "4. Quality Education" },
  { id: 5, label: "5. Gender Equality" },
  { id: 6, label: "6. Clean Water & Sanitation" },
  { id: 7, label: "7. Affordable & Clean Energy" },
  { id: 8, label: "8. Decent Work & Economic Growth" },
  { id: 9, label: "9. Industry, Innovation & Infra" },
  { id: 10, label: "10. Reduced Inequalities" },
  { id: 11, label: "11. Sustainable Cities & Communities" },
  { id: 12, label: "12. Responsible Consumption" },
  { id: 13, label: "13. Climate Action" },
  { id: 14, label: "14. Life Below Water" },
  { id: 15, label: "15. Life on Land" },
  { id: 16, label: "16. Peace, Justice & Strong Inst." },
  { id: 17, label: "17. Partnerships for the Goals" },
];

export default function SDGSelector({ sdg, setSdg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2 w-full"
    >
      <label className="text-sm font-medium text-gray-700 flex justify-between items-center">
        <span>Target SDG (Optional)</span>
        <span className="text-[10px] sm:text-xs text-gray-400 font-normal">Select one</span>
      </label>

      <div className="relative w-full">
       
        <select
          value={sdg}
          onChange={(e) => setSdg(e.target.value)}
          className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 bg-white text-base sm:text-sm cursor-pointer text-gray-700 truncate"
        >
          <option value="" className=" text-sm font-medium text-gray-700">No specific SDG goal</option>
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
    </motion.div>
  );
}