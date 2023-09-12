const database = require("../database");
async function getCourses(
    id
  ) {
    //await database.startup();
    const sql=`SELECT STUDENT_ID,"LEVEL",TERM,DEPT_ID FROM STUDENT WHERE STUDENT_ID=:id`
            const binds = {id
            };
    const result=(await database.execute(sql, binds)).rows
    
    //console.log(result[0]);
    const sql2=`SELECT COURSE_ID,CREDIT,TITLE FROM COURSE WHERE "LEVEL"=:leve AND "TERM"=:ter AND  DEPT_ID=: deptID AND 
    COURSE_ID NOT IN (SELECT COURSE_ID FROM ENROLLMENT WHERE STUDENT_ID=:sID)` 
    const leve=result[0].LEVEL;
    const ter=result[0].TERM;
    const deptID=result[0].DEPT_ID;
    const sID=result[0].STUDENT_ID;
    const binds2 = {leve,ter,deptID,sID};

    const result2=(await database.execute(sql2, binds2)).rows
    return result2;
  //  console.log(result2);

  }

  async function getApprovedCourses(  id ) 
  {
    //await database.startup();
    const st='approved'
    const sql=`SELECT COURSE.COURSE_ID,COURSE.TITLE,COURSE.CREDIT FROM ENROLLMENT 
    JOIN COURSE on ENROLLMENT.COURSE_ID=COURSE.COURSE_ID WHERE STUDENT_ID =:id AND STATUS =: st`
            const binds = { id,st };
    const result=(await database.execute(sql, binds)).rows;
    return result;

  }

  async function getRegistrationStatus() 
  {
 
    const sql=`SELECT REGISTRATION_STATUS FROM REGISTRATION`
            const binds = { };
    const result=(await database.execute(sql, binds)).rows;
    return result;

  }

  async function changeRegistrationStatus(status) 
  {
    if(status=='Open')
    {
      const sql=`UPDATE REGISTRATION SET REGISTRATION_STATUS=: b`;
      const binds={b:'Open'};
      await database.execute(sql,binds); 
    }

    if(status=='Close')
    {
      const sql=`UPDATE REGISTRATION SET REGISTRATION_STATUS=: b`;
      const binds = {b:'Close'};
      await database.execute(sql,binds); 
      const sql2=`UPDATE ENROLLMENT SET STATUS=: c WHERE STATUS =: d `
      const binds2 = {c:'approved',d:'waiting for approval'};
      await database.execute(sql2,binds2);
    }

  }

  async function getNotGradedCount()
  {
    const sql=`SELECT COUNT(*) as count FROM ENROLLMENT WHERE STATUS='waiting for approval'`
    const binds={}
    return (await database.execute(sql,binds)).rows;
  }

  async function levelTermUpdate()
  {
    const sql=`DELETE FROM STUDENT WHERE "LEVEL" = 'GD' AND TERM = 'GD'`
    const binds={}
    return (await database.execute(sql,binds)).rows;    

  }

  //getCourses(446);
  module.exports={getCourses,getApprovedCourses,getRegistrationStatus,changeRegistrationStatus,getNotGradedCount,levelTermUpdate}
  