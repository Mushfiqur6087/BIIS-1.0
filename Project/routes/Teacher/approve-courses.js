const express = require("express");
const { type } = require("os");
const { runInNewContext } = require("vm");
const router = express.Router({ mergeParams: true });
const query = require("../../Database/TEACHER/courses");
router.get("/", async (req, res) => {
  const itemsArray = await query.viewCourses(req.user.TEACHER_ID);
  //console.log(itemsArray);
  res.render("teacherApproveCourses", { itemsArray });
});

router.post("/submit", async (req, res) => {
  let courses = req.body["selectedItems[]"];
  // const itemsArray=await query.viewCourses(req.user.TEACHER_ID)
  //console.log(itemsArray);
  // console.log(courses);

  if (Array.isArray(courses)) {
   // console.log(courses);
    await query.changeCourseStauts(courses);
  } else {
   // console.log([courses]);
    await query.changeCourseStauts([courses]);
  }

  res.redirect("../../teacher");
});
module.exports = router;
