const database = require("../database");
async function advisorInformation(id) {

  const sql = `
        SELECT 
            I_ID
        FROM 
            ADVISOR WHERE S_ID =: id
            `;
  const binds = {id};

  const a=(await database.execute(sql, binds)).rows;
  const a_id=a[0].I_ID;

  const sql2=`SELECT * FROM TEACHER WHERE TEACHER_ID=: a_id`
  const binds2={a_id};
  return ((await database.execute(sql2, binds2)).rows);

}


module.exports={advisorInformation}