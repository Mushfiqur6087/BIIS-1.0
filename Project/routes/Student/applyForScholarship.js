const express = require("express");
const router = express.Router({ mergeParams: true });
const query = require("../../Database/STUDENT/scholarship&dues");
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');


async function generatePDF(studentInfo) {
  const lineHeight = 25;
  const margin = 50;
  const fontSizeTitle = 20;
  const fontSizeContent = 14;

  const pdfDoc = await PDFDocument.create();
  const pageWidth = 600;
  let pageHeight = margin + fontSizeTitle;

  for (const key of Object.keys(studentInfo)) {
    pageHeight += lineHeight;
  }

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  let currentY = pageHeight - margin;

  page.drawText(`Student Information:`, { x: margin, y: currentY, size: fontSizeTitle });
  currentY -= lineHeight;

  for (const [key, value] of Object.entries(studentInfo)) {
    page.drawText(`${key}: ${value}`, { x: margin, y: currentY, size: fontSizeContent, color: rgb(0, 0, 0) });
    currentY -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}







router.get("/", async (req, res) => {
  const status = await query.getScholarshipStatus(req.user.STUDENT_ID);
  let div2 = true;
  let showDiv = true;

  if (status.length) {
    showDiv = false;

    if (status[0].STATUS == "approved") {
      div2 = false;
    }
  }
  const options = await query.getScholarshipInformaton();
  //   console.log(showDiv,"before render");
  res.render("applyForScholarship", { options, showDiv, div2 });
});



router.post("/submit", async (req, res) => {
  await query.addStudentScholarshipApplication(
    req.user.STUDENT_ID,
    req.body.option
  );

const pdfBytes = await generatePDF(req.user);
const filePath = path.join(__dirname, '..', '..', 'docs','scholarship', `${req.user.STUDENT_ID}.pdf`);
await fs.writeFile(filePath, pdfBytes);

res.redirect("../../student");
});
module.exports = router;
