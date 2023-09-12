const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});

router.get('/', async (req, res) => 
{
    res.render('studentResult');        
});
module.exports=router;