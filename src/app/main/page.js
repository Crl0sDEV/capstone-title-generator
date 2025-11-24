"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCapstone } from "@/hooks/useCapstone";

// Components
import AppHeader from "@/components/AppHeader";
import CourseSelect from "@/components/CourseSelect";
import KeywordsInput from "@/components/KeywordsInput";
import SuggestionsList from "@/components/SuggestionsList";
import TechStackInput from "@/components/TechStackInput";
import ActionButtons from "@/components/ActionButtons";
import FloatingControls from "@/components/FloatingControls";
import ResultDisplay from "@/components/ResultDisplay";
import ResetModal from "@/components/ResetModal";
import AboutModal from "@/components/AboutModal";
import HowItWorksModal from "@/components/HowItWorksModal";

const SUGGESTIONS = [
  "AI",
  "Mobile App",
  "Web",
  "E-Commerce",
  "IoT",
  "Chatbot",
  "Blockchain",
];

export default function Home() {
  const {
    course,
    setCourse,
    keywords,
    setKeywords,
    techstack,
    setTechstack,
    result,
    loading,
    cooldown,
    errorMsg,
    showResetModal,
    setShowResetModal,
    showInfo,
    setShowInfo,
    showAbout,
    setShowAbout,
    generateTitles,
    addKeyword,
    resetAll,
  } = useCapstone();

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-black flex items-center justify-center p-4 sm:p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-full max-w-lg sm:max-w-xl md:max-w-2xl"
      >
        {/* Header */}
        <AppHeader
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          setShowAbout={setShowAbout}
        />

        {/* Modals */}
        <HowItWorksModal showInfo={showInfo} setShowInfo={setShowInfo} />
        <AboutModal showAbout={showAbout} setShowAbout={setShowAbout} />

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
              {cooldown > 0 && (
                <p className="font-semibold mt-1">Try again in {cooldown}s</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inputs */}
        <div className="space-y-5">
          <CourseSelect course={course} setCourse={setCourse} />

          <div>
            <KeywordsInput keywords={keywords} setKeywords={setKeywords} />
            <SuggestionsList items={SUGGESTIONS} addKeyword={addKeyword} />
          </div>

          <TechStackInput techstack={techstack} setTechstack={setTechstack} />
        </div>

        {/* Generate Button */}
        <ActionButtons
          cooldown={cooldown}
          loading={loading}
          generateTitles={generateTitles}
        />

        {/* Floating Controls (COPY + PDF + Reset) */}
        <FloatingControls
          result={result}
          course={course}
          setShowResetModal={setShowResetModal}
        />

        {/* Results Display */}
        <ResultDisplay result={result} />
      </motion.div>

      {/* Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
          <ResetModal
            show={showResetModal}
            onCancel={() => setShowResetModal(false)}
            onConfirm={resetAll}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
