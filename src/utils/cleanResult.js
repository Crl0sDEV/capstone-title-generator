export function cleanResult(text) {
    if (!text) return "";
  
    return text
      .replace(/\*\*/g, "")                // remove bold markdown
      .replace(/"([^"]*)"/g, "$1")         // remove quotes around titles
      .replace(/“|”/g, "")                 // remove smart quotes
      .replace(/\n{3,}/g, "\n\n")          // fix too many line breaks
      .trim();
  }
  