const express = require("express");
const { type } = require("os");
const { runInNewContext } = require("vm");
const router = express.Router({ mergeParams: true });
const path = require('path');
const query = require("../../Database/TEACHER/sholarship");
router.get("/", async (req, res) => {
    const itemsArray= await query.viewScholarship(req.user.TEACHER_ID)
    res.render("teacherApproveScholarship",{itemsArray});
});

router.post("/submit", async (req, res) => 
{

  let scholarship = req.body["selectedItems[]"];

  if (Array.isArray(scholarship)) 
  {
    console.log(scholarship);
    await  query.changeScholarshipStatus(scholarship);
  } 
  else 
  {
    console.log([scholarship]);
    await  query.changeScholarshipStatus([scholarship]);
  }

  res.redirect("../../teacher");
});

router.get('/download-pdf/:studentID', (req, res) => {
  const studentID = req.params.studentID;
  console.log(studentID);

  const pdfFilePath = path.join(__dirname,'..','..','docs','scholarship', `${studentID}.pdf`); // Adjust the path based on your PDF files location

  res.download(pdfFilePath, `${studentID}.pdf`, (err) => {
    if (err) {
      console.error('Error downloading PDF:', err);
     // res.status(500).send('Error downloading PDF.');
    }
  });
});



module.exports = router;
