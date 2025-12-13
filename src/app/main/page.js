"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCapstone } from "@/hooks/useCapstone";

import AppHeader from "@/components/AppHeader";
import CourseSelect from "@/components/CourseSelect";
import KeywordsInput from "@/components/KeywordsInput";
import TopicInput from "@/components/TopicInput";
import SDGSelector from "@/components/SDGSelector";
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
    topic,
    setTopic,
    sdg,
    setSdg,
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
        className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-full max-w-lg lg:max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-5">
            <AppHeader
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              setShowAbout={setShowAbout}
            />

            <HowItWorksModal showInfo={showInfo} setShowInfo={setShowInfo} />
            <AboutModal showAbout={showAbout} setShowAbout={setShowAbout} />

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
                    <p className="font-semibold mt-1">
                      Try again in {cooldown}s
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <CourseSelect course={course} setCourse={setCourse} />
              <SDGSelector sdg={sdg} setSdg={setSdg} />
              <TopicInput topic={topic} setTopic={setTopic} />

              <div>
                <KeywordsInput keywords={keywords} setKeywords={setKeywords} />
                <SuggestionsList items={SUGGESTIONS} addKeyword={addKeyword} />
              </div>

              <TechStackInput
                techstack={techstack}
                setTechstack={setTechstack}
              />
            </div>

            <ActionButtons
              cooldown={cooldown}
              loading={loading}
              generateTitles={generateTitles}
            />
          </div>

          <div
            className={`flex-col h-full lg:block ${
              !result ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="hidden lg:flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {result ? "Generated Titles" : "Output Preview"}
              </h3>

              {result && (
                <FloatingControls
                  result={result}
                  course={course}
                  setShowResetModal={setShowResetModal}
                />
              )}
            </div>

            <h3 className="lg:hidden text-xl font-bold mb-4 text-gray-800">
              {result ? "Generated Titles" : "Output Preview"}
            </h3>

            <div className="flex-grow bg-[#fafafa] border border-gray-200 rounded-2xl p-6 relative flex flex-col h-[500px] lg:h-[722px]">
              {result ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col h-full overflow-hidden"
                >
                  <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar pb-20 lg:pb-0">
                    <ResultDisplay result={result} isSeparate={true} />
                  </div>

                  <div className="lg:hidden">
                    <FloatingControls
                      result={result}
                      course={course}
                      setShowResetModal={setShowResetModal}
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4">
                  <div className="p-4 bg-white rounded-full shadow-sm border border-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">
                      Ready to Generate
                    </p>
                    <p className="text-sm mt-1 max-w-[200px] mx-auto">
                      Fill in the details and click generate to see the results.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

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
