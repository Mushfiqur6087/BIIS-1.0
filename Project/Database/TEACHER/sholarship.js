const database = require("../database");
async function viewScholarship(id) 
{
    sql=`SELECT STUDENT_ID,STUDENT_SCHOLARSHIP.SCHOLARSHIP_ID,SCHOLARSHIP_TITLE,AMOUNT FROM STUDENT_SCHOLARSHIP JOIN SCHOLARSHIP 
    ON STUDENT_SCHOLARSHIP.SCHOLARSHIP_ID=SCHOLARSHIP.SCHOLARSHIP_ID
    WHERE TEACHER_ID =: id AND STUDENT_SCHOLARSHIP.STATUS =:St
    `
    const st='waiting for approval'
    binds={id,st}
    return (await database.execute(sql,binds)).rows;

}

async function changeScholarshipStatus(courses) {
    for (let i = 0; i < courses.length; i++) 
    {
      const parts = courses[i].split(" ");
      console.log(parts);
      const p = parts[0].trim();
      const t = parts.slice(1).join(" ").trim();
  //    console.log(t);
     // console.log(part3);
     const s='approved'
    // console.log(s,t);
     const sql=`UPDATE STUDENT_SCHOLARSHIP 
     SET STATUS =: s
     WHERE STUDENT_ID =: p AND SCHOLARSHIP_ID =: t`
     const binds={s,p,t}
  
     await database.execute(sql,binds);
    }
  }

module.exports={viewScholarship,changeScholarshipStatus};