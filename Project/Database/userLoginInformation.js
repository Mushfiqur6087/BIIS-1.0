const database = require("./database");
async function getUserInformation() {
  const sql = `
        SELECT 
            USER_ID,PASSWORD,ROLE
        FROM 
            USER_TABLE
            `;
  const binds = {};

  return (await database.execute(sql, binds)).rows;
}

async function getUserTotalInformation(id, role) {
 // await database.startup();
  if (role == 'student')
  {
    const sql = `SELECT * FROM STUDENT WHERE STUDENT_ID=: ID`;
    const binds = {
        ID : id
    }
    return ((await database.execute(sql, binds)).rows);

  }
  else if (role=='teacher')
  { 
    const sql = `SELECT * FROM TEACHER WHERE TEACHER_ID=: ID`;
    const binds = {
        ID : id
    }
    return (await database.execute(sql, binds)).rows;
}

}



//getUserTotalInformation(446,'student');
module.exports = {
  getUserInformation,getUserTotalInformation
};
