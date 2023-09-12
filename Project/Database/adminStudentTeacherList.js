const database = require("./database");
const file =require("../config/findImage")
async function totalStudent() 
{
    const sql=`SELECT * FROM STUDENT`
    const binds={}
    const r= (await database.execute(sql,binds)).rows;
    r.forEach(element => {
        element.IMAGE=file.findPhotoById(element.STUDENT_ID);
        
    });
    return r;
}


async function singleStudent(ID) 
{
    const sql=`SELECT * FROM STUDENT WHERE STUDENT_ID =: ID`
    const binds={ID}
    const r= (await database.execute(sql,binds)).rows;
    return r;
}


async function totalTeacher() 
{
    const sql=`SELECT * FROM TEACHER`
    const binds={}
    const r= (await database.execute(sql,binds)).rows;
    r.forEach(element => {
        element.IMAGE=file.findPhotoById(element.STUDENT_ID);
        
    });
    return r;
}


async function singleTeacher(ID) 
{
    const sql=`SELECT * FROM TEACHER WHERE TEACHER_ID =: ID`
    const binds={ID}
    const r= (await database.execute(sql,binds)).rows;
    return r;
}

async function totalDepartmentTeacherView()
{


  const sql = `SELECT DEPARTMENT_ID,GET_FULL_DEPARTMENT_NAME(DEPARTMENT_NAME) AS FULL_DEPARTMENT,DEPARTMENT_NAME,
(SELECT COUNT(*) FROM TEACHER WHERE DEPT_ID=DEPARTMENT_ID AND UPPER(TRIM(RANK))='PROFESSOR') AS PROFESSOR_COUNT,
(SELECT COUNT(*) FROM TEACHER WHERE DEPT_ID=DEPARTMENT_ID AND UPPER(TRIM(RANK))='LECTURER') AS LECTURER_COUNT,
(SELECT COUNT(*) FROM TEACHER WHERE DEPT_ID=DEPARTMENT_ID AND UPPER(TRIM(RANK))='ASSOCIATE PROFESSOR') AS ASSOCIATE_PROF_COUNT,
COUNT(DISTINCT TEACHER_ID) AS TOTAL_TEACHER
FROM DEPARTMENT JOIN TEACHER ON DEPARTMENT.DEPARTMENT_ID=DEPT_ID
GROUP BY DEPARTMENT_ID,DEPARTMENT_NAME`;
  const binds={};
  const r= (await database.execute(sql,binds)).rows;
  return r;


}












async function totalDepartment() 
{
    const sql=`SELECT DEPARTMENT_ID,GET_FULL_DEPARTMENT_NAME(DEPARTMENT_NAME) AS FULL_DEPARTMENT,DEPARTMENT_NAME,
    COUNT(DISTINCT STUDENT_ID) AS TOTAL_STUDENTS,
    (SELECT COUNT(*) FROM STUDENT WHERE "LEVEL"='L1' AND TERM='T1' AND DEPT_ID=DEPARTMENT_ID) AS L1_T1,
    (SELECT COUNT(*) FROM STUDENT WHERE "LEVEL"='L1' AND TERM='T2' AND DEPT_ID=DEPARTMENT_ID) AS L1_T2,
    (SELECT COUNT(*) FROM STUDENT WHERE "LEVEL"='L2' AND TERM='T1' AND DEPT_ID=DEPARTMENT_ID) AS L2_T1,
    (SELECT COUNT(*) FROM STUDENT WHERE "LEVEL"='L2' AND TERM='T2' AND DEPT_ID=DEPARTMENT_ID) AS L2_T2,
    (SELECT COUNT(*) FROM STUDENT WHERE "LEVEL"='L3' AND TERM='T1' AND DEPT_ID=DEPARTMENT_ID) AS L3_T1,
    (SELECT COUNT(*) FROM STUDENT WHERE "LEVEL"='L3' AND TERM='T2' AND DEPT_ID=DEPARTMENT_ID) AS L3_T2,
    (SELECT COUNT(*) FROM STUDENT WHERE "LEVEL"='L4' AND TERM='T1' AND DEPT_ID=DEPARTMENT_ID) AS L4_T1,
    (SELECT COUNT(*) FROM STUDENT WHERE "LEVEL"='L4' AND TERM='T2' AND DEPT_ID=DEPARTMENT_ID) AS L4_T2
     FROM DEPARTMENT JOIN STUDENT ON DEPARTMENT.DEPARTMENT_ID=DEPT_ID
    GROUP BY DEPARTMENT_ID,DEPARTMENT_NAME`
    const binds={}
    const r= (await database.execute(sql,binds)).rows;
    return r;
}



module.exports={ totalStudent,totalDepartment,singleStudent,totalDepartmentTeacherView,totalTeacher,singleTeacher };