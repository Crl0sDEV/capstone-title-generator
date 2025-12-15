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
  }, [fullText]);

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
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white px-6 font-sans">
      
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-6 h-10 sm:h-12 flex items-center">
        {displayedText}
        <span className="animate-pulse ml-1 text-blue-500">|</span>
      </h1>

      <div className="h-6 mb-4 flex items-center justify-center">
        <motion.p
          key={currentLog}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-sm sm:text-base text-gray-400 font-mono text-center"
        >
          {currentLog}
        </motion.p>
      </div>

      <div className="w-full max-w-md bg-gray-800 h-2 sm:h-3 rounded-full overflow-hidden border border-gray-700">
        
        <motion.div
          className="h-full bg-white w-0"
          initial={{ width: "0%" }} 
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
        />
      </div>

      <p className="mt-3 text-xs sm:text-sm text-gray-500 font-mono tracking-widest">
        {progress}%
      </p>
    </div>
  );
}