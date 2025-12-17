export function cleanResult(text) {
    if (!text) return "";
  
    return text
      .replace(/\*\*/g, "")
      .replace(/"([^"]*)"/g, "$1")
      .replace(/“|”/g, "") 
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
  