const database = require("../database");
async function viewCourses(id) {
  // await database.startup();
  const s = "waiting for approval";
  const sql = `SELECT ENROLLMENT.STUDENT_ID,CONCAT(CONCAT(STUDENT.FIRST_NAME,' '),STUDENT.LAST_NAME) AS NAME ,ENROLLMENT.COURSE_ID,COURSE.TITLE,COURSE."LEVEL",COURSE."TERM" FROM ADVISOR JOIN ENROLLMENT ON S_ID=ENROLLMENT.STUDENT_ID 
  JOIN COURSE ON COURSE.COURSE_ID=ENROLLMENT.COURSE_ID JOIN STUDENT ON STUDENT.STUDENT_ID=ENROLLMENT.STUDENT_ID WHERE I_ID =:id AND ENROLLMENT.STATUS =:s
  ORDER BY ENROLLMENT.COURSE_ID`;
  const binds = { id, s };

  //  const str=(( await database.execute(sql, binds)));
  // console.log(str);
  return (await database.execute(sql, binds)).rows;
}

async function changeCourseStauts(courses) {
  for (let i = 0; i < courses.length; i++) 
  {
    const parts = courses[i].split(" ");
    const p = parts[0].trim();
    const t = parts.slice(1).join(" ").trim();
    console.log(t);
   // console.log(part3);
   const s='approved'
  // console.log(part1,part2);
   const sql=`UPDATE ENROLLMENT 
   SET STATUS =: s
   WHERE STUDENT_ID =: p AND COURSE_ID =: t`
   const binds={s,p,t}

   await database.execute(sql,binds);
  }
}

async function createNewCourse(cid,dName,ttle,c,l,t)
{ 
  //console.log(c);
  //await database.startup();
  const sql=`INSERT INTO COURSE VALUES(:cid,GET_DEPARTMENT_ID(:dname),:ttle,TO_NUMBER(:c),:l,:t)`
  const binds={cid,dName,ttle,c,l,t}
  await database.execute(sql,binds);

}
//  changeCourseStauts(['332 433 234'])

////console.log( await viewGrede());
//createNewCourse('CSE 455','BME','ERWRWERRT',2,'L1','T2');
module.exports = { viewCourses, changeCourseStauts ,createNewCourse};
