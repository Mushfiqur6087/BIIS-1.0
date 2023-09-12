const database = require("../database");

async function getScholarshipInformaton() {
  const sql = `
          SELECT *
          FROM 
              SCHOLARSHIP
              `;
  const binds = {};

  return (await database.execute(sql, binds)).rows;
}
async function getScholarshipStatus(id) 
{
    await database.startup();
    const sql = `
            SELECT STATUS
            FROM 
                STUDENT_SCHOLARSHIP WHERE STUDENT_ID= :id
                `;
    const binds = {id};
  
    return( ( (await database.execute(sql, binds)).rows));
  }


async function addStudentScholarshipApplication(id, sid) {
    //await database.startup();
    const sql = `SELECT * FROM ADVISOR WHERE S_ID =: id
                `;
    const binds = {id};
  
    const a= (await database.execute(sql, binds)).rows;

    const aID=a[0].I_ID;
    const t='waiting for approval'
    const binds2={id,sid,aID,t}
    const sql2=`INSERT INTO STUDENT_SCHOLARSHIP(STUDENT_ID,SCHOLARSHIP_ID,STATUS,TEACHER_ID) VALUES (:id,:sid,:t,:aID)`
    return (await database.execute(sql2, binds2)).rows;


  }


  async function getStudentDues(id) {
    await database.startup();
    const sql = `SELECT * FROM DUES JOIN STUDENT_DUES ON DUES.DUE_ID= STUDENT_DUES.DUES_ID WHERE STUDENT_ID =:id AND STATUS =:st
                `;
    const st='Not Cleared'
    const binds = {id,st};
    return ( (await database.execute(sql, binds)).rows);


  }

  //getStudentDues(4401)



 //// addStudentScholarshipApplication(4401,1);

module.exports={getScholarshipInformaton,addStudentScholarshipApplication,
  getScholarshipStatus,getStudentDues};