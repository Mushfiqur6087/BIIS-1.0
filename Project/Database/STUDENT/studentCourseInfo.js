const database = require("../database");
async function studentCourse(ID) {
  const status= (await database.execute(`SELECT COUNT(*) AS COUNT FROM ENROLLMENT WHERE STUDENT_ID =: id AND GRADE = 'F'`,{id:ID})).rows
  console.log(status[0].COUNT);
  if(status[0].COUNT=='0')
  {
  //await database.startup();
  const sql = `BEGIN
  STUDENT_COURSE_STATUS(:id,:sid,:msg1, :msg2, :msg3,:msg4);
END;`;

  const binds = { 
    id:   ID,
    sid:  { dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
    msg1: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 },
    msg2: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 },
    msg3: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 },
    msg4: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 }
}

  const result= (await database.execute(sql, binds));
  return (result.outBinds);
}
return -1;
}


async function getID() {
  const sql = `SELECT DISTINCT(STUDENT_ID) FROM ENROLLMENT WHERE STATUS =: e`;

  const binds =  {  // bind variables
    e: 'Graded',
}
  const result= (await database.execute(sql, binds));
  const rows = (result.rows.length === 1) ? [result.rows] : result.rows;

  return rows;
  //return result;
}

async function getFailedSttudent() {
  const sql = `SELECT DISTINCT(STUDENT_ID),COUNT(COURSE_ID) as COURSE_COUNT FROM ENROLLMENT WHERE STATUS =: e AND GRADE ='F' GROUP BY STUDENT_ID`;

  const binds =  {  // bind variables
    e: 'Graded',
}
  let result= (await database.execute(sql, binds));
 // console.log("result",result);
  const rows = (result.rows.length === 1) ? [result.rows] : result.rows;
  //console.log("rows",rows);

  return rows;

}

module.exports={studentCourse,getID,getFailedSttudent};

//studentCourse(4006);