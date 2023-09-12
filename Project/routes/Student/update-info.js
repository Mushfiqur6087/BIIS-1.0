const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const path = require('path');
const multer = require('multer');
const query=require("../../Database/STUDENT/insertStudent");

const storage = multer.diskStorage({
        destination: path.join(__dirname, '..','..','public','img'),
        filename: function(req, file, cb) {
          //console.log('multer',req.user.STUDENT_ID);
          cb(null,'STUDENT'+'-'+ file.fieldname + '-' + req.user.STUDENT_ID + path.extname(file.originalname));
        }
      });
const upload = multer({ storage: storage });
//homepage
router.get('/', (req, res) => 
{
        let isoDateOfBirth
        if (req.user.DATE_OF_BIRTH) {
         isoDateOfBirth = ((req.user.DATE_OF_BIRTH)).toISOString().split('T')[0];
                // Now you can use isoDateOfBirth in your code
              } else {
         isoDateOfBirth=""
              }

        const studentInfo = {
                phoneNo: req.user.PHONE_NO,
                phoneNo2: req.user.PHONE_NO2,
                email: req.user.EMAIL,
                bankNo: req.user.BANK_ACCOUNT,
                address: req.user.ADDRESS,
                dateOfBirth: isoDateOfBirth,
                nid: req.user.NID
              };
        res.render('updateInfo',{studentInfo});
        
});

router.post('/update', upload.single('File'),async (req, res) => 
{
 //  console.log(req.body);
    const {Phone1,Phone2,Email,BankNP,Address,DOB,NID} =req.body;
   // console.log(File);
    const result= await query.updateInformation(req.user.STUDENT_ID,Phone1,Phone2,Email,BankNP,Address,new Date(DOB),NID);
    res.redirect('../../student');        
});


module.exports=router;
