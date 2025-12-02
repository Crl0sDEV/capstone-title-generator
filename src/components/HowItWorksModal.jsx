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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white p-5 sm:p-7 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
              How It Works
            </h2>

            <div className="space-y-3 sm:space-y-4 text-gray-600 text-xs sm:text-sm leading-relaxed">
              <p>
                <b className="text-gray-900">1. Choose your Course</b> — Select BSIT, BSCS, or BSIS.
              </p>

              <p>
                <b className="text-gray-900">2. Describe the Problem</b> — (Optional) Briefly explain the real-world problem or topic you want to solve (e.g., "Slow barangay queuing").
              </p>

              <p>
                <b className="text-gray-900">3. Enter Keywords</b> — Add specific keywords such as the system type, users, or features.
              </p>

              <p>
                <b className="text-gray-900">4. Pick your Tech Stack</b> — List technologies you want (React, Laravel, Flutter, Firebase, etc.).
              </p>

              <p>
                <b className="text-gray-900">5. Generate AI Titles</b> — Click Generate to get 3 unique, system-based capstone titles.
              </p>

              <p>
                <b className="text-gray-900">6. Save & Reset</b> — You can <b>Copy</b> the results, <b>Download as PDF</b>, or <b>Reset</b> to start over.
              </p>
            </div>

            <div className="mt-5 p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-xl">
              <h3 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1">Rate Limit</h3>
              <p className="text-gray-500 text-[10px] sm:text-xs">
                You can generate titles <b>3 times per hour</b>. Each generation produces 3 unique titles.
              </p>
            </div>

            <button
              onClick={() => setShowInfo(false)}
              className="w-full py-2.5 mt-5 rounded-xl bg-black text-white text-xs sm:text-sm font-medium hover:bg-gray-800 transition active:scale-95"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}