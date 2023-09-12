const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
router.get('/', (req, res) => 
{
    res.render('addTeacher');
        
});
module.exports=router;