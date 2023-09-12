const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../Database/adminFirstPage");
const { ro } = require('date-fns/locale');

//homepage
router.get('/', async (req, res) => 
{

        res.render('login');
        
});

module.exports=router;