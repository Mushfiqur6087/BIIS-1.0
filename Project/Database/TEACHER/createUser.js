const database = require("../database");
async function insertInformation(
  id,
  password,
  firstName,
  lastName,
  deptID
) {
  try
  {
  let connection;
  connection = await database.oracledb.getConnection();
  //await database.startup();
  const sql=`INSERT INTO USER_TABLE(USER_ID,PASSWORD,ROLE) VALUES(:id,:password,:role)`
  const role='teacher';
  const binds = {id,password,role
  };
  await database.execute(sql, binds,connection);
  const sql2=`INSERT INTO TEACHER(TEACHER_ID,FIRSTNAME,LASTNAME,DEPT_ID,RANK) VALUES(:id,:firstName,:lastName,:deptID,:r)`
  const r='lecturer';
  const binds2={id,firstName,lastName,deptID,r};
  await database.execute(sql2,binds2,connection);
  if(database.ErrorMsg.showError===false)
  {
    console.log('inside commit');
    await connection.commit();
    await connection.close();


  }
  else
  {
    console.log(database.ErrorMsg.showError);
    console.log('inside rollback');
    await connection.rollback();
    await connection.close();

  }
}catch(err)
{
  console.log('ERROR executing SQL within transaction: ' + err.message);
  throw err;
}

}


async function updateInformation(
  id,
  phoneNo,
  phoneNo2,
  email,
  address
) {
 // await database.startup();
  const sql=`UPDATE TEACHER
  SET 
  PHONE1= :phoneNo,
  PHONE2= :phoneNo2,
  MAIL= :email,
  ADDRESS = :address  
  WHERE TEACHER_ID= :id`
  const binds = {id,phoneNo,phoneNo2,email,address
  };
  await database.execute(sql,binds);

}

//updateInformation(8802,12244,12345,'gmail','addresss');
module.exports = { insertInformation ,updateInformation};