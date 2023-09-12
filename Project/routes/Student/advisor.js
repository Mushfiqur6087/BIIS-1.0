const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../../Database/STUDENT/advisor");
const file=require("../../config/findImage")

router.get('/', async (req, res) => 
{
    const i= await query.advisorInformation(req.user.STUDENT_ID);
    const information=i[0];
    information.image=file.findPhotoById(information.TEACHER_ID);

    //console.log(information,"this is advisor information");

    res.render('studentAdvisorPage',{information});        
});
module.exports=router;