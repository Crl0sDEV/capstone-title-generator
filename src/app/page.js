"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCapstone } from "@/hooks/useCapstone";
import { generatePDF } from "@/utils/pdfHelper";

const SUGGESTIONS = ["AI", "Mobile App", "Web", "E-Commerce", "IoT", "Chatbot", "Blockchain"];

export default function Home() {
  const {
    course, setCourse,
    keywords, setKeywords,
    techstack, setTechstack,
    result, loading, cooldown, errorMsg,
    showResetModal, setShowResetModal,
    generateTitles, addKeyword, resetAll
  } = useCapstone();

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-black flex items-center justify-center p-4 sm:p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-full max-w-lg sm:max-w-xl md:max-w-2xl"
      >
        <h1 className="text-4xl font-semibold text-center mb-8 tracking-tight">
          Capstone Title Generator
        </h1>

        {/* Error Message */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-xl text-sm overflow-hidden"
            >
              {errorMsg}
              {cooldown > 0 && <p className="font-semibold mt-1">Try again in {cooldown}s</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inputs */}
        <div className="space-y-5">
          {/* Course Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Course:</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full p-3 border rounded-xl bg-[#fafafa] focus:ring-2 focus:ring-black transition cursor-pointer"
            >
              <option value="BSIT">BSIT</option>
              <option value="BSIS">BSIS</option>
              <option value="BSCS">BSCS</option>
            </select>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium mb-1">Keywords (optional):</label>
            <input
              type="text"
              placeholder="e.g., AI, Web, System"
              className="w-full p-3 border rounded-xl bg-[#fafafa] focus:ring-2 focus:ring-black transition"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {SUGGESTIONS.map((s) => (
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
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Tech Stack:</label>
            <input
              type="text"
              placeholder="e.g., React, Laravel, Firebase"
              className="w-full p-3 border rounded-xl bg-[#fafafa] focus:ring-2 focus:ring-black transition"
              value={techstack}
              onChange={(e) => setTechstack(e.target.value)}
            />
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-5 mt-8">
          <motion.button
            whileTap={{ scale: cooldown > 0 ? 1 : 0.92 }}
            animate={cooldown > 0 ? { boxShadow: ["0 0 0px #0000", "0 0 10px #999"], transition: { repeat: Infinity, repeatType: "reverse", duration: 1.2 } } : {}}
            onClick={generateTitles}
            disabled={loading || cooldown > 0}
            className={`px-5 py-3 rounded-xl text-white font-medium transition ${
              cooldown > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? <span className="animate-pulse">Generating...</span> : cooldown > 0 ? `Locked (${cooldown}s)` : "Generate Titles"}
          </motion.button>

          {/* Floating Controls (PDF & Reset) */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-xl shadow-xl border border-white/40 flex items-center gap-4 z-50"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => generatePDF(course, result)}
                  className="p-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                  title="Download PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375H8.25m0 0L10.5 6m-2.25 2.25L6 6m2.25 2.25v8.25A2.25 2.25 0 0010.5 18h3a2.25 2.25 0 002.25-2.25v-1.5" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowResetModal(true)}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium"
                >
                  Reset
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-[#fafafa] border border-gray-200 rounded-2xl shadow-sm whitespace-pre-line text-[15px] leading-relaxed"
            >
              {result}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md text-center"
            >
              <h2 className="text-xl font-semibold mb-3">Are you sure?</h2>
              <p className="text-gray-600 mb-6">This will clear all inputs and generated titles.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowResetModal(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">Cancel</button>
                <button onClick={resetAll} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">Yes, Reset</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}