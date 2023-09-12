const express = require('express');
const { type } = require('os');
const { runInNewContext } = require('vm');
const router = express.Router({mergeParams : true});
const query = require("../../Database/adminStudentTeacherList");
const query2 = require("../../Database/adminDelete");
const error =require("../../Database/database")

router.get('/', async (req, res) => 
{
    const teacherList=await query.totalTeacher(); 
    const departmentList= await query.totalDepartmentTeacherView();
    res.render('adminteacherList',{teacherList,departmentList});

});

let st;


router.post('/detailedList', async (req, res) => 
{
    st = req.body;
    res.status(200).send('OK');

});

router.get('/detailedList', async (req, res) => 
{
    //console.log(st);
    const std=(await query.singleTeacher(st.studentId));
    const teacher=std[0];

    res.render('adminViewTeacherPage',{teacher});

});
router.post('/detailedList/update',async (req,res)=>
{
    const r=await query2.deleteTeacher(req.body.form);
   // console.log(r);
    if(r==false || error.ErrorMsg.showError==true)
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
        <h1>Can not delete Teacher</h1>
        </div>
    </body>
    </html>   
  `);


    }
    else
    
    res.redirect('../../../admin');
})




module.exports=router;