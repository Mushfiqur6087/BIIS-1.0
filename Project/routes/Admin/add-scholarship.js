const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../../Database/TEACHER/scholarship");
router.get('/', (req, res) => 
{
    res.render('adminScholarship');
});

router.post('/update',async (req, res) => 
{
    console.log(req.body);
    await query.addScholarship(req.body.title.trim(),req.body.description.trim(),req.body.amount.trim());
    res.redirect("../../admin");
});

module.exports=router;