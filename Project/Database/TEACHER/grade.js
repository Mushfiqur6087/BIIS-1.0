const database = require("../database");

async function addgrade(id) {
  const t = "Not Graded";
  const e = "approved";

  const sql = `SELECT ID,TEACHES.COURSE_ID,COUNT(ENROLLMENT.STUDENT_ID) AS STUDENT_COUNT FROM TEACHES JOIN ENROLLMENT ON TEACHES.COURSE_ID=ENROLLMENT.COURSE_ID
    WHERE TEACHES.STATUS =: t AND ENROLLMENT.STATUS =: e AND ID =: id
    GROUP BY ID,TEACHES.COURSE_ID`;
  const binds = { t, e, id };

  return (await database.execute(sql, binds)).rows;
}

async function addCGPA(id,cid) {
  const sql = `SELECT ENROLLMENT.STUDENT_ID,CONCAT(CONCAT(STUDENT.FIRST_NAME,' '),STUDENT.LAST_NAME) NAME,TEACHES.COURSE_ID FROM ENROLLMENT JOIN 
            TEACHES ON ENROLLMENT.COURSE_ID=TEACHES.COURSE_ID JOIN STUDENT ON ENROLLMENT.STUDENT_ID=STUDENT.STUDENT_ID
             WHERE ID= :id AND TEACHES.COURSE_ID =: cid AND ENROLLMENT.STATUS =: e AND TEACHES.STATUS =: t`;
  const t = "Not Graded";
  const e = "approved";
  const binds={id,cid,t,e};
  return (await database.execute(sql, binds)).rows;
}

async function updateGrade(g,cid,tid) 
{
  for (let i = 0; i < g.length; i++) 
  {
    const item = g[i].trim();
    const parts = item.split(/\s+/);
    const id = parts[0];
    const grade = parts[1];



  const sql= `UPDATE ENROLLMENT
  SET 
  GRADE =: grade,
  STATUS =: st
  WHERE STUDENT_ID =: id AND COURSE_ID =:cid`
  const st='Graded'
  //console.log(st,id,grade,cid,"grade");
  
  const binds={st,id,grade,cid}
  console.log(await database.execute(sql, binds).rows);

  }

  const sql=`UPDATE TEACHES
  SET STATUS =: st 
  WHERE ID =:tid AND COURSE_ID =:cid`
  const st='Graded'

  const binds={st,tid,cid}
  await database.execute(sql,binds).rows;



}

////console.log( await viewGrede());
module.exports = { addgrade,addCGPA,updateGrade };
