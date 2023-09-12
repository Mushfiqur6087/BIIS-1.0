const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query = require("../../Database/adminDue");
router.get('/', (req, res) => 
{
    res.render('adminNewDues');
        
});

router.post('/update',async (req, res) => 
{
    await query.addDue(req.body.Description,req.body.Amount);
    //console.log("body",req.body);
    res.redirect('../../admin');
        
});

module.exports=router;