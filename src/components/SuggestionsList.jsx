"use client";
import { motion } from "framer-motion";

export default function SuggestionsList({ items, addKeyword }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2 text-sm">
      {items.map((s) => (
        <motion.button
          key={s}
          whileTap={{ scale: 0.92 }}
          onClick={() => addKeyword(s)}
          className="px-3 py-1 bg-[#e7e7e8] rounded-full hover:bg-black hover:text-white transition"
        >
          {s}
        </motion.button>
      ))}
    </div>
  );
}
