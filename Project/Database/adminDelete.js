const database = require("./database");
async function deleteStudent(id)
{
    const sql=`DELETE FROM USER_TABLE WHERE USER_ID =: id`
    const binds={id}
    await database.execute(sql,binds);
}

async function deleteTeacher(id)
{
    const sql1=`SELECT * FROM TEACHES WHERE ID =: id`;
    const binds1={id};
    const r=(await database.execute(sql1,binds1)).rows;
    console.log("inside r",r);
    if(r.length)
    {
        return false;
    }
    else
    {
    const sql=`DELETE FROM USER_TABLE WHERE USER_ID =: id`
    const binds={id}
    await database.execute(sql,binds);
       return true;
    }
}

module.exports={deleteStudent,deleteTeacher};
