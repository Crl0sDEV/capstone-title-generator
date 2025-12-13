"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePDF } from "@/utils/pdfHelper";
import {
  ClipboardDocumentCheckIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

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

  const ToolButton = ({
    onClick,
    icon,
    label,
    colorClass = "hover:bg-gray-100 hover:text-black",
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg text-gray-400 transition-all duration-200 flex items-center gap-2 ${colorClass}`}
      title={label}
    >
      {icon}
      <span className="hidden lg:none text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <>
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 lg:bottom-12 lg:top-auto px-4 py-2 text-xs font-medium bg-black/90 text-white shadow-lg rounded-full z-[100] pointer-events-none whitespace-nowrap"
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="lg:hidden fixed bottom-6 left-6 right-6 z-50 flex items-center justify-between p-2 rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl border border-gray-200/50"
      >
        <button
          onClick={handleCopy}
          className="flex-1 flex flex-col items-center p-2 text-blue-600 active:scale-95 transition"
        >
          <ClipboardDocumentCheckIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Copy</span>
        </button>
        <div className="w-px h-8 bg-gray-200"></div>
        <button
          onClick={handleDownload}
          className="flex-1 flex flex-col items-center p-2 text-gray-800 active:scale-95 transition"
        >
          <ArrowDownTrayIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">PDF</span>
        </button>
        <div className="w-px h-8 bg-gray-200"></div>
        <button
          onClick={() => setShowResetModal(true)}
          className="flex-1 flex flex-col items-center p-2 text-red-500 active:scale-95 transition"
        >
          <ArrowPathIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Reset</span>
        </button>
      </motion.div>

      <div className="hidden lg:flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
        <ToolButton
          onClick={handleCopy}
          label="Copy"
          icon={<ClipboardDocumentCheckIcon className="w-5 h-5" />}
          colorClass="hover:bg-blue-50 hover:text-blue-600"
        />

        <ToolButton
          onClick={handleDownload}
          label="PDF"
          icon={<ArrowDownTrayIcon className="w-5 h-5" />}
          colorClass="hover:bg-gray-100 hover:text-gray-900"
        />

        <div className="w-px h-5 bg-gray-200 mx-1"></div>

        <ToolButton
          onClick={() => setShowResetModal(true)}
          label="Reset"
          icon={<ArrowPathIcon className="w-5 h-5" />}
          colorClass="hover:bg-red-50 hover:text-red-600"
        />
      </div>
    </>
  );
}
