const express = require('express');
const router = express.Router({mergeParams : true});
router.get('/', (req, res) => 
{
    res.render('studentNotification');
        
});

module.exports=router;