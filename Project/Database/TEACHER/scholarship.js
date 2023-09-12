const { sq } = require("date-fns/locale");
const database = require("../database");

async function addScholarship(t,d,a) 
{
    const sql=`INSERT INTO SCHOLARSHIP VALUES(:t,:d,SeqForScholarship.NEXTVAL,:a)`
    const binds={t,d,a}
    await database.execute(sql,binds);

}

module.exports={addScholarship};


