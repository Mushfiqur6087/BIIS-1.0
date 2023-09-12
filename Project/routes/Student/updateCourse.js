const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../../Database/STUDENT/insertStudent");

router.post('/',  async (req, res) => 
{
    const courses = req.body['selectedItems[]']
    console.log(courses);

    if(Array.isArray(courses))
    {
    await query.insertIntoEnrollMent(req.user.STUDENT_ID,courses,req.user.LEVEL,req.user.TERM)
    }
    else
    {
        const c=[courses]
        await query.insertIntoEnrollMent(req.user.STUDENT_ID,c,req.user.LEVEL,req.user.TERM)
    }

    res.redirect('../student');        
});
module.exports=router;