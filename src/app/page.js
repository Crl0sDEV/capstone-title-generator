'use client';
import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const suggestions = ['AI', 'Mobile App', 'Web', 'E-Commerce', 'IoT', 'Chatbot', 'Blockchain'];

export default function Home() {
  const [course, setCourse] = useState('BSIT');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [techstack, setTechstack] = useState('');

  const [cooldown, setCooldown] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cooldownUntil");
    if (saved) {
      const diff = Math.floor((saved - Date.now()) / 1000);
      if (diff > 0) setCooldown(diff);
    }
  }, []);

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

  const handleGenerate = async () => {
    if (cooldown > 0) return;

    setLoading(true);
    setResult('');
    setErrorMsg("");

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course, keywords, techstack }),
    });

    const data = await res.json();

    if (res.status === 429) {
      const resetTime = data.reset;
      const seconds = Math.floor((resetTime - Date.now()) / 1000);

      setCooldown(seconds);
      localStorage.setItem("cooldownUntil", resetTime);

      setErrorMsg("Rate limit reached. Please wait before generating again.");
      setLoading(false);
      return;
    }

    setResult(data.result);
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Capstone Titles for ${course}`, 10, 10);
    doc.text(result, 10, 20);
    doc.save('capstone-titles.pdf');
  };

  const handleAddSuggestion = (suggestion) => {
    if (!keywords.includes(suggestion)) {
      setKeywords((prev) => (prev ? prev + ', ' + suggestion : suggestion));
    }
  };

  return (
    <main className="min-h-screen bg-white text-black p-6 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Capstone Title Generator
        </h1>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
            {errorMsg}
            {cooldown > 0 && (
              <p className="font-semibold mt-1">
                Try again in {cooldown}s
              </p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label className="block font-medium mb-1">Select Course:</label>
          <select
            className="w-full p-2 border rounded"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="BSIT">BSIT</option>
            <option value="BSCS">BSCS</option>
            <option value="BSIS">BSIS</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Keywords (optional):</label>
          <input
            type="text"
            placeholder="e.g., AI, web, system"
            className="w-full p-2 border rounded"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleAddSuggestion(s)}
                className="px-3 py-1 bg-gray-200 rounded-full hover:bg-black hover:text-white transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Preferred Tech Stack (optional):
          </label>
          <input
            type="text"
            placeholder="e.g., React, Laravel, Firebase"
            className="w-full p-2 border rounded"
            value={techstack}
            onChange={(e) => setTechstack(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleGenerate}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            disabled={loading || cooldown > 0}
          >
            {cooldown > 0
              ? `Locked (${cooldown}s)`
              : loading
              ? "Generating..."
              : "Generate Titles"}
          </button>

          {result && (
            <button
              onClick={handleDownloadPDF}
              className="text-sm underline text-blue-600 hover:text-blue-800"
            >
              Download PDF
            </button>
          )}
        </div>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded border whitespace-pre-line text-gray-800">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
