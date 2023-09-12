const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const { Readable } = require('stream');


const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({
   storage: storage,
});


const query = require("../../Database/adminDue");

router.get('/', async (req, res) => 
{
    const optionsArray = await query.selectDue();
    //console.log(duelist);
    res.render('adminAddDues',{optionsArray});
        
});


router.post("/update", upload.single('File'),async (req, res) => {
    const fileBuffer = req.file.buffer.toString('utf8'); 
    const results = [];
    const stream = Readable.from(fileBuffer); 
    console.log(req.body.option);
  
    stream
        .pipe(csv())
        .on('data', (row) => {
            // Process each CSV row here
            results.push(row);
        })
        .on('end',async () => {
            //console.log(results);
            
            // Processing is done; you can now work with the 'results' array
            await query.addStudentDue(req.body.option,results)
            


  
            // Redirect to a success page
            res.redirect('../../admin');
        })
        .on('error', (error) => {
            console.error(error);
            res.status(500).send('Error processing the CSV file.');
        });
  
  
  
  
  });


module.exports=router;