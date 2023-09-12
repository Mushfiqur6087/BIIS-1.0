const express = require("express");
const { type } = require("os");
const { runInNewContext } = require("vm");
const router = express.Router({ mergeParams: true });
const query=require("../../Database/TEACHER/grade");
const query2=require("../../Database/STUDENT/course")
router.get("/", async (req, res) => 
{
  const options=await query.addgrade(req.user.TEACHER_ID)
  const st=await query2.getRegistrationStatus();
  const status=st[0].REGISTRATION_STATUS;
  if (status!='Open')
  {
  res.render("teacherCouseSelect",{options});
  }
  else
  res.render("teacherCourseSelectWhenRegistationClosed");

});
let course;


router.post("/submit",async (req,res)=>
{

  const studentList = await query.addCGPA(req.user.TEACHER_ID,req.body.option);
   course=req.body.option;
  
  res.render("teacherCourseGPAchange",{studentList});

})


router.post("/gradesubmit",async (req,res)=>
{

  //const studentList = await query.addCGPA(req.user.TEACHER_ID,req.body.option);
  const submittedGrade=req.body['grades[]'];
  console.log(submittedGrade,"submt");
  await query.updateGrade([submittedGrade],course,req.user.TEACHER_ID)
  
  
  res.redirect("../../teacher")

})

module.exports=router;

//gradesubmit