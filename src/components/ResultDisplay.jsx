"use client";

import { motion } from "framer-motion";

export default function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 bg-[#fafafa] border border-gray-200 rounded-2xl shadow-sm whitespace-pre-line text-[15px] leading-relaxed"
    >
      {result}
    </motion.div>
  );
}