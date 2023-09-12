const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query=require("../../Database/TEACHER/courses");
const error = require("../../Database/database")

router.get('/', (req, res) => 
{
    res.render('adminAddCourse');
});

router.post('/update', async (req, res) => 
{
    const courseID=req.body.option[0]+' '+req.body.courseID.trim();  
  //  console.log(courseID);
    const deptID=req.body.option[1];
  //  console.log(req.body);
  const credit=req.body.option[2];
  const levelTerm=req.body.option[3];
  const level = levelTerm.substring(0,2).trim();
  const term =  levelTerm.substring(2).trim();
  //console.log("level",level);
  await query.createNewCourse(courseID,deptID,req.body.courseTitle,credit,level,term);
  //console.log(courseID,deptID,credit,level,term);
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
      <h1>New Course Not Created</h1>
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




module.exports=router;