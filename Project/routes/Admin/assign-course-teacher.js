const express = require("express");
const { type } = require("os");
const { runInNewContext } = require("vm");
const multer = require('multer');
const router = express.Router({ mergeParams: true });
const fs = require('fs');
const csv = require('csv-parser');
const { Readable } = require('stream');
const error = require("../../Database/database")


const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({
   storage: storage,
});

const query=require("../../Database/TEACHER/teahesQuery");
router.get("/", async (req, res) => {
    //const itemsArray = await query.viewCourses(req.user.TEACHER_ID);
    //console.log(itemsArray);
    res.render("adminAssignCourseTeacher");
  });


  router.post("/assignTeacher1", async (req, res) => {
    const st=await query.insertTeaches(req.body.ID,req.body.PASSWORD);
    
    if(error.ErrorMsg.showError==true)
    {
        res.status(403).contentType('text/html').send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error 403 - Wrong Entry</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #3498db; /* Blue background color */
            }
    
            .error-message {
                font-size: 12px;
                text-align: center;
                text-transform: uppercase;
                color: #fff; /* White text color */
                background-color: #e74c3c; /* Red background color */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            }
        </style>
    </head>
    <body>
        <div class="error-message">
        <h1>Course Teacher Not assigned</h1>
        <h1>Make sure that teacher belongs in same department where course is offered</h1>>
        </div>
    </body>
    </html>   
  `);
}
else
{
    res.redirect('../../admin'); 
} 
  });

  router.post("/assignTeacher2", upload.single('File'),async (req, res) => {
    const fileBuffer = req.file.buffer.toString('utf8'); 
    const results = [];
    const stream = Readable.from(fileBuffer); 
  
    stream
        .pipe(csv())
        .on('data', (row) => {
            // Process each CSV row here
            results.push(row);
        })
        .on('end',async () => {
            // Processing is done; you can now work with the 'results' array
            const st=await query.insertTeachesMany(results);
            res.redirect('../../admin');
          //  console.log("error",error.ErrorMsg);
             

        })
        .on('error', (error) => {
            console.error(error);
            res.status(500).send('Error processing the CSV file.');
        });
  
  
  
  
  });


  




module.exports=router;