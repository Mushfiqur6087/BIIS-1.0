const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../../Database/STUDENT/scholarship&dues");

router.get('/', async (req, res) => 
{
    const items=await query.getStudentDues(req.user.STUDENT_ID);
   // console.log(items);
    res.render('StudentDuesPage',{items});        
});
module.exports=router;