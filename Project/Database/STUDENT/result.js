const database = require("../database");
async function viewGrede(id, l, t) {
  //await database.startup();
  const sql = `SELECT COURSE.COURSE_ID,TITLE,CREDIT,GRADE,CONVERTGRADETOPOINT(GRADE) AS G FROM RESULT JOIN COURSE ON COURSE.COURSE_ID= RESULT.COURSE_ID
     WHERE STUDENT_ID=:id 
    AND COURSE."LEVEL"=:l AND COURSE.TERM=:t 
              `;
  const binds = { id, l, t};

  //  const str=(( await database.execute(sql, binds)));
  // console.log(str);
  return (await database.execute(sql, binds)).rows ;
}


async function levelTermCg(id,l,t)
{
  const sql =`BEGIN
      GET_TOTAL_CGPA_PROCEDURE(:id,:l,:t,:msg);
     END;`

     const binds = 
     { 
      id,l,t,
      msg:  { dir: oracledb.BIND_OUT, type: oracledb.NUMBER}
     }
     const result= (await database.execute(sql, binds));
     return (result.outBinds);


}

async function totalCGPA(id,l,t)
{
  
  const sql = `BEGIN
  GET_TOTAL_CGPA_ALL_TERM(:id,:msg);
 END;`
 const binds = 
 { 
  id,
  msg:  { dir: oracledb.BIND_OUT, type: oracledb.NUMBER}
 }
 const result= (await database.execute(sql, binds));
 return (result.outBinds);  
}


////console.log( await viewGrede());
module.exports = { viewGrede,totalCGPA,levelTermCg };
