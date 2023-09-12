const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const bcrypt=require('bcrypt')
const router = express.Router({mergeParams : true});
const error = require("../../Database/database")

const query=require("../../Database/STUDENT/createUser");
router.post('/', async (req, res) => 
{
    const {ID,PASSWORD,firstName,lastName,deptID,advisorID,hall}=req.body;
    const hashPWD=await bcrypt.hash(PASSWORD,10);
    await query.insertInformation(ID,hashPWD,firstName,lastName,deptID,hall,advisorID);
    console.log("error msg in update" ,error.ErrorMsg);
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
        <h1>You have entered wrong information.</h1>
        <h1>Student Not inserted</h1>
        <h1>Make sure that student id is not present in the database</h1>
        <h1>Also advisor and student should be in same department </h1>
        <h1>Advisor id and department id must exist in teacher and department table</h1>
        </div>
    </body>
    </html>
    
  `);

    }
    else
    {
    res.redirect('../admin'); 
    }   
        
});
module.exports=router;