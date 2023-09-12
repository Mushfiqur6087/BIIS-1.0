const express = require('express');
const router = express.Router({mergeParams : true});
router.get('/', (req, res) => 
{
    res.render('adminNotification');
        
});

module.exports=router;


