"use client";

import { motion } from "framer-motion";

export default function ActionButtons({
  cooldown,
  loading,
  generateTitles,
}) {
  return (
    <div className="flex flex-col gap-3 mt-8">
      <div className="flex items-center gap-5">
        <motion.button
          whileTap={{ scale: cooldown > 0 ? 1 : 0.92 }}
          animate={
            cooldown > 0
              ? {
                  boxShadow: ["0 0 0px #0000", "0 0 10px #999"],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                  },
                }
              : {}
          }
          onClick={generateTitles}
          disabled={loading || cooldown > 0}
          className={`flex-1 px-5 py-3 rounded-xl text-white font-medium transition text-center ${
            cooldown > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? (
            <span className="animate-pulse">Generating...</span>
          ) : cooldown > 0 ? (
            `Locked (${cooldown}s)`
          ) : (
            "Generate Titles"
          )}
        </motion.button>
      </div>

      <p className="text-xs text-center text-gray-400">
        Daily Limit: 3 generations per hour
      </p>
    </div>
  );
}
