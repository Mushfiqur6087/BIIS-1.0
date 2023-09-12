const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query = require("../../Database/adminStudentTeacherList");
const query2 = require("../../Database/adminDelete");

router.get('/', async (req, res) => 
{
    const studentList=await query.totalStudent(); 
    const departmentList= await query.totalDepartment();
    res.render('adminStudentList',{studentList,departmentList});

});
let st;


router.post('/detailedList', async (req, res) => 
{
    st = req.body;
    res.status(200).send('OK');

});

router.get('/detailedList', async (req, res) => 
{
    //console.log(st);
    const std=(await query.singleStudent(st.studentId));
    const student=std[0];

    res.render('adminViewStudentPage',{student});

});
router.post('/detailedList/update',async (req,res)=>
{
    const r=await query2.deleteStudent(req.body.form)
    res.redirect('../../../admin');
})




module.exports=router;