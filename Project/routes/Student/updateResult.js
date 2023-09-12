const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../../Database/STUDENT/result");

router.post('/',  async (req, res) => 
{
    semester=req.body.option.split(" ");
    const data2=await query.levelTermCg(req.user.STUDENT_ID,semester[0],semester[1]);
    const data3=await query.totalCGPA(req.user.STUDENT_ID,semester[0],semester[1]);
    const data=await query.viewGrede(req.user.STUDENT_ID,semester[0],semester[1]);

    //console.log("inside result",data2,data3);
    //console.log(result);
    res.render('studentResultView',{data,data2,data3})


});
module.exports=router;