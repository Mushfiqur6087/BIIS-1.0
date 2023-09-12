const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../Database/STUDENT/studentInfo");
//homepage
router.get('/',async (req, res) => 
{
        //console.log("student",req.user.studentID);
        const stInfo=await query.getStudentInfo(req.user.STUDENT_ID);

        let isoDateOfBirth
        if (req.user.DATE_OF_BIRTH) {
         isoDateOfBirth = ((req.user.DATE_OF_BIRTH)).toISOString().split('T')[0];
                // Now you can use isoDateOfBirth in your code
              } else {
         isoDateOfBirth=""
              }
        const studentInfo = {
                studentID: req.user.STUDENT_ID,
                firstName: req.user.FIRST_NAME,
                lastName: req.user.LAST_NAME,
                phoneNo: req.user.PHONE_NO,
                phoneNo2: req.user.PHONE_NO2,
                email: req.user.EMAIL,
                bankNo: req.user.BANK_ACCOUNT,
                address: req.user.ADDRESS,
                dateOfBirth: isoDateOfBirth,
                hall: req.user.HALL,
                nid: req.user.NID,
                deptID: req.user.DEPT_ID
              };

     //   console.log("this comes with each req " ,student);
        res.render('studentHomepage',{studentInfo,stInfo});
        
});
router.use('/update-info',require('./Student/update-info'))
router.use('/courses',require('./Student/courses'))
router.use('/updateCourse',require('./Student/updateCourse'))
router.use('/viewResult',require('./Student/viewResult'))
router.use('/updateResult',require('./Student/updateResult'))
router.use('/applyForScholarship',require('./Student/applyForScholarship'))
router.use('/dues',require('./Student/dues'))
router.use('/advisor',require('./Student/advisor'))
router.use('/notification',require('./Student/notification'))

module.exports=router;

