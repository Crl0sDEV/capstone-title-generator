"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  const logs = useMemo(
    () => [
      "Preparing academic resources...",
      "Analyzing research domains...",
      "Collecting system keywords...",
      "Processing technology stacks...",
      "Structuring capstone title patterns...",
      "Generating title suggestions...",
      "Finalizing academic engine...",
      "Ready to generate your Capstone Title.",
    ],
    []
  );

  const [currentLog, setCurrentLog] = useState(logs[0]);
  const [progress, setProgress] = useState(0);
  const fullText = "Capstone Title Generator";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 6) + 3;

      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => router.push("/main"), 700);
      }

      setProgress(p);

      const logIndex = Math.floor((p / 100) * (logs.length - 1));
      setCurrentLog(logs[logIndex]);
    }, 500);

    return () => clearInterval(interval);
  }, [logs, router]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white px-6">
      
      {/* Title Typing */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-6">
        {displayedText}
        <span className="animate-pulse">|</span>
      </h1>

      {/* Log Line */}
      <motion.p
        key={currentLog}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="text-sm sm:text-base text-gray-300 mb-4 font-mono"
      >
        {currentLog}
      </motion.p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-gray-700 h-3 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
        />
      </div>

      {/* Percent */}
      <p className="mt-2 text-gray-300 font-mono">{progress}%</p>
    </div>
  );
}
