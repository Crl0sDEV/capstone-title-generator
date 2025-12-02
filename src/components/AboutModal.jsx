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
              About This Tool
            </h2>

            <div className="space-y-3 text-gray-600 text-xs sm:text-sm leading-relaxed text-justify">
              <p>
                The <b>Capstone Title Generator</b> is designed to help IT, CS, and
                IS students quickly create unique, creative, and system-based
                capstone project titles. It uses AI to generate professional,
                realistic titles based on your chosen course, problem context, keywords, and
                preferred technologies.
              </p>

              <p>
                Once generated, you can easily <b>Copy to Clipboard</b> or <b>Download as PDF</b> for your documentation.
              </p>

              <p>
                This tool includes built-in rate-limiting to keep it fair for
                everyone. You may use the generator <b>3 times per hour</b> (producing 3 titles per attempt), and
                the system automatically resets your available attempts.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-[10px] sm:text-xs">
                Created by <span className="text-gray-700 font-medium">Carlos Miguel Sandrino</span>
                <br />
                Crafted with React, Next.js, & Groq AI.
              </p>
            </div>

            <button
              onClick={() => setShowAbout(false)}
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