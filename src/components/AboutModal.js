"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function AboutModal({ showAbout, setShowAbout }) {
  return (
    <AnimatePresence>
      {showAbout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white p-7 rounded-2xl shadow-xl w-[90%] max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-3 text-center">
              About This Tool
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              The Capstone Title Generator is designed to help IT, CS, and
              IS students quickly create unique, creative, and system-based
              capstone project titles. It uses AI to generate professional,
              realistic titles based on your chosen course, keywords, and
              preferred technologies.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              This tool includes built-in rate-limiting to keep it fair for
              everyone. You may generate up to <b>3 titles per hour</b>, and
              the system automatically resets your available attempts.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Created by <b>Carlos Miguel Sandrino</b> — crafted with React,
              Next.js, Framer Motion, Tailwind CSS, and Groq AI.
            </p>

            <button
              onClick={() => setShowAbout(false)}
              className="w-full py-2 mt-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
