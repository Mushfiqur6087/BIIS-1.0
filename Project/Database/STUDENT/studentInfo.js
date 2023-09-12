const { compareSync } = require("bcrypt");
const file=require("../../config/findImage")
const database = require("../database");
async function getStudentInfo(id) {
   // await database.startup();

   // console.log("id",id);
    const sql=`SELECT (FIRST_NAME||' '||LAST_NAME) FULLNAME,STUDENT_ID,GET_FULL_DEPARTMENT_NAME(DEPARTMENT_NAME) DEPT_NAME,
    CONCAT(CONCAT(CONCAT('Level: ', "LEVEL"),' '),CONCAT('Term: ', TERM)) lt
    ,HALL FROM STUDENT JOIN DEPARTMENT ON DEPARTMENT_ID=DEPT_ID WHERE STUDENT_ID =: id`
    const binds={id};
    const r= (await database.execute(sql,binds)).rows;

    const result=r[0];
   // console.log(result);
   // console.log("result",result);
    result.image=file.findPhotoById(id);
    console.log(result);
    return result;


}

//getStudentInfo(4006);
//console.log(st);
module.exports={getStudentInfo};