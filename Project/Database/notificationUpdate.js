const database = require("./database");

function getCurrentOracleTimestamp() 
{
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");
  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");
  const milliseconds = String(currentTime.getMilliseconds()).padStart(3, "0");
  const oracleTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  return oracleTimestamp + '000000';
}




function getCurrentOracleTimestamp5secBefore() 
{
  const currentTime = new Date();
  currentTime.setTime(currentTime.getTime() - 5000);
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");
  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");
  const milliseconds = String(currentTime.getMilliseconds()).padStart(3, "0");
  const oracleTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  return oracleTimestamp + '000000';
}

async function notificationUpdate() {
  //!await database.startup();
  const b = getCurrentOracleTimestamp();
  const a = getCurrentOracleTimestamp5secBefore();
 // console.log(a);

  const sql =
  `
  SELECT *
  FROM ADMIN_LOGS
  WHERE "CURRENT_DATE" BETWEEN TO_TIMESTAMP(:a, 'YYYY-MM-DD HH24:MI:SS.FF') 
  AND TO_TIMESTAMP(:b, 'YYYY-MM-DD HH24:MI:SS.FF')
`
;
  const binds = {a,b};

  return (( await database.execute(sql, binds)).rows);
  //return (await database.execute(sql, binds)).rows;
}


async function notificationUpdateStudentTeacher() {
  
  const b = getCurrentOracleTimestamp();
  const a = getCurrentOracleTimestamp5secBefore();
 // console.log(a);

  const sql =
  `
  SELECT *
  FROM NOTIFICATION
  WHERE "CURRENT_DATE" BETWEEN TO_TIMESTAMP(:a, 'YYYY-MM-DD HH24:MI:SS.FF') 
  AND TO_TIMESTAMP(:b, 'YYYY-MM-DD HH24:MI:SS.FF')
`
;
  const binds = {a,b};

  const r= (( await database.execute(sql, binds)).rows);
  console.log('inside query',r);
  return r;
  //return (await database.execute(sql, binds)).rows;
}

//notificationUpdate();
module.exports={notificationUpdate,notificationUpdateStudentTeacher};