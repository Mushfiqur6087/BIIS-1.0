require("dotenv").config();
oracledb = require("oracledb");
oracledb.autoCommit = false;
//console.log(process.env.DB_CONNECTSTRING.trim());

//!   let clientOpts = {};
//!   if (process.platform === 'win64')                                   
//!    clientOpts = { libDir: 'C:\\oracle\\instantclient_21_11' };
//! else if (process.platform === 'darwin' && process.arch === 'x64') { // macOS Intel
//!    clientOpts = { libDir: process.env.HOME + '/Downloads/instantclient_19_8' };
//! // else on other platforms the system library search path
//!  // must always be set before Node.js is started.
let ErrorMsg=
{
  showError: false, // Set this boolean based on your condition
  errorMessage: "No error", 
}




// creates connection pool for oracledb
const poolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectString: process.env.DB_CONNECTION,
  poolMin: 4,
  poolMax: 10,
  poolIncrement: 1,
};

async function startup() 
{
  //await oracledb.initOracleClient(clientOpts);
  console.log("starting up database");
  await oracledb.createPool(poolConfig);
  console.log("pool created");
  


}



// closes connection pool for oracledb
async function shutdown() {
  console.log("shutting down database.");
  try {
    // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
    await oracledb.getPool().close(10);
    console.log("Pool closed");
  } catch (err) {
    console.log("ERROR shutting down database: " + err.message);
  }
}

async function execute(sql, binds, connection = null) {
  ErrorMsg.showError= false; // Set this boolean based on your condition
  ErrorMsg.errorMessage= "No error";

  if (!connection) {
    // If no connection is provided, create a new connection
    let newConnection;
    try {
      newConnection = await oracledb.getConnection();
      const options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      };
      const results = await newConnection.execute(sql, binds, options);
      await newConnection.commit();
      return results;
    } catch (err) {
      ErrorMsg.showError = true;
      ErrorMsg.errorMessage = err.message;
      console.log('ERROR executing SQL: ' + err.message);
      //throw err;
    } finally {
      if (newConnection) {
        try {
          // Close the new connection if it was created
          await newConnection.close();
        } catch (err) {
          console.log('ERROR closing new connection: ' + err);
        }
      }
    }
  } else {
    // If a connection is provided, use it to execute the query
    try {
      const options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      };
      const results = await connection.execute(sql, binds, options);
      return results;
    } catch (err) {
      ErrorMsg.showError = true;
      ErrorMsg.errorMessage = err.message;
      console.log('ERROR executing SQL within transaction: ' + err.message);
    }
  }
}




// options for execution sql

module.exports = {oracledb,
  startup,
  shutdown,
  execute,ErrorMsg,
};
//all async execute