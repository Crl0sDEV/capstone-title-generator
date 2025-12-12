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
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 left-1/2 px-4 py-2 text-sm font-medium bg-black/80 backdrop-blur-md text-white shadow-lg rounded-full z-[60] whitespace-nowrap"
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:bottom-8 z-50
                   flex items-center justify-between sm:justify-center gap-2 sm:gap-3 
                   p-2 sm:px-6 sm:py-3 
                   rounded-2xl bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/50"
      >

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-3 sm:py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 flex-shrink-0"
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
          <span className="text-xs sm:text-sm font-semibold">Copy</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-3 sm:py-2.5 rounded-xl bg-gray-900 text-white hover:bg-black transition shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <span className="text-xs sm:text-sm font-semibold">PDF</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowResetModal(true)}
          className="flex-none flex items-center justify-center p-3 sm:px-4 sm:py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition border border-gray-200"
          title="Reset"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span className="hidden sm:inline ml-2 text-sm font-semibold">
            Reset
          </span>
        </motion.button>
      </motion.div>
    </>
  );
}