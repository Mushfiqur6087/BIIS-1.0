const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../../Database/TEACHER/createUser");
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
        destination: path.join(__dirname, '..','..','public','img'),
        filename: function(req, file, cb) {
        //  console.log('multer',req.user.TEACHER_ID);
          cb(null, 'TEACHER'+'-'+file.fieldname + '-' + req.user.TEACHER_ID + path.extname(file.originalname));
        }
      });
const upload = multer({ storage: storage });

router.get('/', (req, res) => 
{

        const teacherInfo = {
                phoneNo: req.user.PHONE1,
                phoneNo2: req.user.PHONE2,
                email: req.user.MAIL,
                address: req.user.ADDRESS,
              };

              console.log(teacherInfo);

        res.render('teacherUpdateInfo',{teacherInfo});
        
});

router.post('/update',upload.single('File'), async (req, res) => 
{
    const {Phone1,Phone2,Email,Address} =req.body;
    console.log(await query.updateInformation(req.user.TEACHER_ID,Phone1,Phone2,Email,Address));
    res.redirect('../../teacher'); 
     
});



module.exports=router;
