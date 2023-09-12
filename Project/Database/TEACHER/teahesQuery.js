const database = require("../database");
async function insertTeaches(id, cid) 
{
    console.log(id,cid);
    const st='Not Graded';
    //await database.startup();
    const sql = `INSERT INTO TEACHES VALUES(:id,:cid,:st)`;
    const binds = { id,cid,st};
    (await database.execute(sql, binds)) ;
}

async function insertTeachesMany(result) 
{
    result.forEach(async (object) => {
        const id = object.ID.trim();
        const cid = object.CourseCode.trim();
        const st =object.Status.trim();
        const sql = `INSERT INTO TEACHES VALUES(:id,:cid,:st)`;
        const binds = { id,cid,st};
        console.log (await database.execute(sql, binds)) ;
    });
    
}


module.exports={insertTeaches,insertTeachesMany};
  