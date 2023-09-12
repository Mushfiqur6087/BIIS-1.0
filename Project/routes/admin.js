const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../Database/adminFirstPage");

//homepage
router.get('/', async (req, res) => 
{
        const data=await query.totalStudentDepartMent();
        const data2=await query.totalStudentCourse();
        //   console.log(data);
        res.render('adminHomepage', {data,data2});
        
});

router.use('/add-student',require('./Admin/add-student'))
router.use('/add-teacher',require('./Admin/add-teacher'))
router.use('/updateStudent',require('./Admin/updateStudent'))
router.use('/updateTeacher',require('./Admin/updateTeacher'))
router.use('/notification',require('./Admin/notification'))
router.use('/assign-course-teacher',require('./Admin/assign-course-teacher'))
router.use('/registration-promoteStudents',require('./Admin/registration-promoteStudents'))
router.use('/promote-students',require('./Admin/promote-students'))
router.use('/add-course',require('./Admin/add-course'))
router.use('/add-scholarship',require('./Admin/add-scholarship'))
router.use('/studentList',require('./Admin/studentList'))
router.use('/teacherList',require('./Admin/teacherList'))
router.use('/add-dues',require('./Admin/addDues'))
router.use('/clear-dues',require('./Admin/clearDues'))
router.use('/new-dues',require('./Admin/newDues'))



module.exports=router;