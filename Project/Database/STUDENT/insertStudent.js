const database = require("../database");
async function updateInformation(
  id,
  Phone1,
  Phone2,
  Email,
  BankNP,
  Address,
  DOB,
  NID
) {
  //await database.startup();
  const sql = `UPDATE STUDENT
       SET 
       PHONE_NO= :PHONE1,
       PHONE_NO2= :PHONE2,
       EMAIL= :EMAIL,
       BANK_ACCOUNT= :BNP,
       ADDRESS = :ADDr,
       DATE_OF_BIRTH= :DB,
       NID= :N_ID 

       
       WHERE STUDENT_ID= :ID`;
  const binds = {
    ID: id,
    PHONE1: Phone1,
    PHONE2: Phone2,
    EMAIL: Email,
    BNP: BankNP,
    ADDr: Address,
    DB: DOB,
    N_ID: NID
  };
  return await database.execute(sql, binds);
}

async function insertIntoEnrollMent(id,course,l,t) {
  for (const cid of course)
  {
    const c=cid.trim();
    const st='waiting for approval';
   // console.log(course,'this is the course');

  const sql=`INSERT INTO ENROLLMENT (STUDENT_ID,COURSE_ID,STATUS) VALUES (:id,:c,:st)`
  const binds = {id,c,st}
  console.log(await database.execute(sql, binds));
  }
}



//updateInformation(446,12244,12234,2332,4456,342,new Date("2003-9-13"),21113);
module.exports={updateInformation,insertIntoEnrollMent}
