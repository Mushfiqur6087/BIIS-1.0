const database = require("./database");
async function totalStudentDepartMent() {
  //await database.startup();
  const sql = `
  SELECT
    d.DEPARTMENT_NAME,
    (SELECT COUNT(DISTINCT s.STUDENT_ID) FROM STUDENT s WHERE s.DEPT_ID = d.DEPARTMENT_ID) AS TOTAL_STUDENTS,
    (SELECT COUNT(DISTINCT t.TEACHER_ID) FROM TEACHER t WHERE t.DEPT_ID = d.DEPARTMENT_ID) AS TOTAL_TEACHERS
FROM
    DEPARTMENT d
            `;
  const binds = {};

 // console.log(( await database.execute(sql, binds)).rows);
 return (await database.execute(sql,binds)).rows

}

async function totalStudentCourse() {
  //await database.startup();
  const sql = `
  SELECT
  DEPARTMENT.DEPARTMENT_NAME,
  COURSE.COURSE_ID,
  CHECK_MAX_ENROLLMENT(COURSE.COURSE_ID) as max_enrollment,
  (SELECT COUNT(*) FROM ENROLLMENT WHERE ENROLLMENT.COURSE_ID = COURSE.COURSE_ID) as current_enrollment,
  (SELECT COUNT(*) FROM TEACHES WHERE TEACHES.COURSE_ID = COURSE.COURSE_ID) as total_teachers
FROM
  COURSE
JOIN
  DEPARTMENT ON DEPARTMENT.DEPARTMENT_ID = COURSE.DEPT_ID
            `;
  const binds = {};

  //console.log(( await database.execute(sql, binds)).rows);
 return (await database.execute(sql,binds)).rows

}


//totalStudentCourse();



//totalStudentDepartMent();
module.exports={totalStudentDepartMent,totalStudentCourse}


