const express = require('express');
//const { type } = require('os');
//const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
router.get('/', async (req, res) => 
{
         const teacherInfo = {
                teacherID: req.user.TEACHER_ID,
                firstName: req.user.FIRSTNAME,
                lastName: req.user.LASTNAME,
                phoneNo: req.user.PHONE1,
                phoneNo2: req.user.PHONE2,
                email: req.user.MAIL,
                rank: req.user.RANK,
                address: req.user.ADDRESS,
                salary: req.user.SALARY,
                deptID: req.user.DEPT_ID
              }; 
        //console.log(teacherInfo);
        res.render('teacherHomePage',{teacherInfo});
        
});

router.use('/update-info',require('./Teacher/update-info'))
router.use('/assign-grade',require('./Teacher/assign-grade'))
router.use('/approve-courses',require('./Teacher/approve-courses'))
router.use('/approve-scholarship',require('./Teacher/approve-scholarship'))
router.use('/notification',require('./Teacher/notification'))



module.exports=router;

