import { jsPDF } from "jspdf";

export const generatePDF = (course, content) => {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const marginLeft = 40;
  const marginTop = 40;
  const lineHeight = 20;
  const maxWidth = 520;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`Capstone Titles for ${course}`, marginLeft, marginTop);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);

  const splitText = doc.splitTextToSize(content, maxWidth);

  let y = marginTop + 30;

  splitText.forEach((line) => {
    if (y > 800) {
      doc.addPage();
      y = marginTop;
    }
    doc.text(line, marginLeft, y);
    y += lineHeight;
  });

  doc.save("capstone-titles.pdf");
};