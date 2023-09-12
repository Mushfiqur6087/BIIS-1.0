const database = require("./database");
async function addDue(d,t)
{
    const sql=`INSERT INTO DUES VALUES(SeqForDues.NEXTVAL,:d,:t)`
    const binds={d,t};
    await database.execute(sql,binds);
}

async function selectDue()
{
    const sql=`SELECT DUE_ID,DESCRIPTION FROM DUES`
    const binds={};
    const result=(await database.execute(sql,binds)).rows;
    return result;
}

async function addStudentDue(Did,object)
{
    object.forEach(async (obj) => {
        const id=obj.ID.trim();
        const d=obj.PaymentDate.trim();
        const sql=`INSERT INTO STUDENT_DUES VALUES(:id,:Did,TO_DATE(:d, 'DD/MM/YYYY'),'Not Cleared')`
        const binds={id,Did,d};
        (await database.execute(sql,binds))
    })

}

async function updateStudentDue(Did,object)
{
    console.log(object);
    object.forEach(async (obj) => {
        const id=obj.ID.trim();
        const sql=`DELETE FROM STUDENT_DUES WHERE STUDENT_ID =: id AND DUES_ID =: Did `
        const binds={id,Did};
        (await database.execute(sql,binds))
    })

}

//Not cleared

module.exports={addDue,selectDue,addStudentDue,updateStudentDue}