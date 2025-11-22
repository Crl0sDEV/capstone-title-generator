import { useState, useEffect } from "react";

export function useCapstone() {
  const [course, setCourse] = useState("BSIT");
  const [keywords, setKeywords] = useState("");
  const [techstack, setTechstack] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  // Load cooldown on mount
  useEffect(() => {
    const saved = localStorage.getItem("cooldownUntil");
    if (saved) {
      const diff = Math.floor((saved - Date.now()) / 1000);
      if (diff > 0) setCooldown(diff);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("cooldownUntil");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const generateTitles = async () => {
    if (cooldown > 0) return;

    setLoading(true);
    setResult("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course, keywords, techstack }),
      });

      const data = await res.json();

      if (res.status === 429) {
        const resetTime = data.reset;
        const seconds = Math.floor((resetTime - Date.now()) / 1000);
        setCooldown(seconds);
        localStorage.setItem("cooldownUntil", resetTime);
        setErrorMsg("Rate limit reached. Please wait before generating again.");
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = (suggestion) => {
    if (!keywords.includes(suggestion)) {
      setKeywords((prev) => (prev ? prev + ", " + suggestion : suggestion));
    }
  };

  const resetAll = () => {
    setCourse("BSIT");
    setKeywords("");
    setTechstack("");
    setResult("");
    setErrorMsg("");
    setCooldown(0);
    localStorage.removeItem("cooldownUntil");
    setShowResetModal(false);
  };

  return {
    // State
    course, setCourse,
    keywords, setKeywords,
    techstack, setTechstack,
    result,
    loading,
    cooldown,
    errorMsg,
    showResetModal, setShowResetModal,
    // Actions
    generateTitles,
    addKeyword,
    resetAll,
  };
}