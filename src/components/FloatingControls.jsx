"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePDF } from "@/utils/pdfHelper";

export default function FloatingControls({
  result,
  course,
  setShowResetModal,
}) {
  if (!result) return null;

  const [popupMessage, setPopupMessage] = useState(""); 

  const showPopup = (msg) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(""), 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    showPopup("Copied!");
  };

  const handleDownload = () => {
    generatePDF(course, result);
    showPopup("PDF Downloaded!");
  };

  return (
    <>
      {/* MINI POPUP */}
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-xl text-black shadow-xl rounded-xl z-50 border border-gray-300"
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CONTROLS */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-xl shadow-xl border border-white/40 flex items-center gap-4 z-50"
      >
        {/* COPY BUTTON */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m0 8h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2m-4 10H6a2 2 0 01-2-2v-6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2z"
            />
          </svg>
          Copy
        </motion.button>

        {/* DOWNLOAD BUTTON */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375H8.25m0 0L10.5 6m-2.25 2.25L6 6m2.25 2.25v8.25A2.25 2.25 0 0010.5 18h3a2.25 2.25 0 002.25-2.25v-1.5"
            />
          </svg>
          Download
        </motion.button>

        {/* RESET BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowResetModal(true)}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium"
        >
          Reset
        </motion.button>
      </motion.div>
    </>
  );
}
