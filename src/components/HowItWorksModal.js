"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function HowItWorksModal({ showInfo, setShowInfo }) {
  return (
    <AnimatePresence>
      {showInfo && (
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
              How It Works
            </h2>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                <b>1. Choose your Course</b> — Select BSIT, BSCS, or BSIS.
              </p>

              <p>
                <b>2. Enter Keywords</b> — Add specific keywords such as the
                system type, users, or features.
              </p>

              <p>
                <b>3. Pick your Tech Stack</b> — List technologies you want
                (React, Laravel, Flutter, Firebase, etc.).
              </p>

              <p>
                <b>4. Generate AI Titles</b> — Click Generate to get clean,
                unique, system-based capstone titles.
              </p>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-xl">
              <h3 className="font-semibold">Rate Limit</h3>
              <p className="text-gray-600 text-sm">
                You can generate up to <b>3 titles per hour</b>.
              </p>
            </div>

            <button
              onClick={() => setShowInfo(false)}
              className="w-full py-2 mt-4 rounded-xl bg-black text-white hover:bg-gray-800 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
