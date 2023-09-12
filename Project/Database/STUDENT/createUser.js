const database = require("../database");
async function insertInformation(
  id,
  password,
  f,
  l,
  d,
  h,
  aID
) {
  try{
  let connection;
  connection = await database.oracledb.getConnection();
  const sql=`INSERT INTO USER_TABLE(USER_ID,PASSWORD,ROLE) VALUES(:id,:password,:role)`
  const role='student';
  const binds = {id,password,role
  };
  await database.execute(sql, binds,connection);
  const sql2=`INSERT INTO STUDENT(STUDENT_ID,FIRST_NAME,LAST_NAME,HALL,DEPT_ID,"LEVEL",TERM) VALUES(:id,:f,:l,:h,:d,:leve,:term)`
  const leve='L1'
  const term='T1'
  const binds2={id,f,l,d,h,leve,term};
  await database.execute(sql2,binds2,connection);
  const sql3=`INSERT INTO ADVISOR(S_ID,I_ID) VALUES(:id,:aID)`
  const binds3={id,aID};
  await database.execute(sql3,binds3,connection);
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

//insertInformation(10000,'23234','asassa','asq',2005,'titumir',8001);
module.exports = { insertInformation };
