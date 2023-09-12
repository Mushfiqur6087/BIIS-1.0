const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../../Database/STUDENT/course");

router.get('/', async (req, res) => 
{
    const itemsArray=await query.getCourses(req.user.STUDENT_ID)
    const header=
    {
      level: req.user.LEVEL,
      term: req.user.TERM
    }
    const st=await query.getRegistrationStatus();
    console.log(st);
    const status=st[0].REGISTRATION_STATUS;
    console.log(status);
    if(status=='Open')
{
    if(itemsArray.length)
    {
   // console.log(itemsArray,'this is the course items')
    res.render('studentCourses',{itemsArray,header});
    }  
    else
    {
    const itemsArray2=await query.getApprovedCourses(req.user.STUDENT_ID);
    //console.log(itemsArray2);
    res.render('studentCourses',{itemsArray,header,itemsArray2})
    }
  }
  else
  res.render('StudentCoursesWhenRegistrationClosed');
    
    

});
module.exports=router;
