const express = require("express");
const router = express.Router({ mergeParams: true });
const query = require("../../Database/STUDENT/course");
const query2 = require("../../Database/STUDENT/studentCourseInfo");
const query3 = require("../../Database/studentPromotion");

router.get("/", async (req, res) => {
  const count = (await query.getNotGradedCount())[0];
  //console.log("COUNT",count);
  const count2 =(await query2.getFailedSttudent());
  //console.log("count2",count2)

   // console.log(count,count2);
  // console.log('ok');
  const resultArray = [];
  const studentID = await query2.getID();

  for (const element of studentID) {
    const result = await query2.studentCourse(element["STUDENT_ID"]);
   // console.log("inside_result",result);
    if(result!='-1')
    {
   // console.log(result.sid);
    resultArray.push(result);
    }
    //studentArray.push(result.sid);
  }

  //console.log(resultArray,count2);
  //console.log(passedStudent,failedStudent);
  console.log(count,"count")
  console.log(resultArray,"resultArray")
  console.log(count2,"count2")


  res.render("adminPromoteStudents", { count,resultArray,count2 });
});


router.post("/promote", async (req, res) => 
{
  await query3.updateTeaches();
  const totalStudent = await query2.getID();
  const failedStudent =(await query2.getFailedSttudent());

  for (const obj of totalStudent) 
  {
   //console.log('insidePassedStudent',obj.STUDENT_ID);
   await query.changeRegistrationStatus('Open')
   await query3.studentPromotion(obj.STUDENT_ID);
  }
  await query.levelTermUpdate();
  res.status(200).send('OK');


});

module.exports = router;
