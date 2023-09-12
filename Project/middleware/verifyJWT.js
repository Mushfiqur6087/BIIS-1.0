const jwt = require("jsonwebtoken");
require("dotenv").config();

const DB_auth = require("../Database/userLoginInformation");
const verifyJWT = (req, res, next) => {
  req.user = null;
  //?check if user has cookie token
  if (req.cookies.accesstoken) {
    let token = req.cookies.accesstoken;
   // console.log('this is the token for user',token)
  ////  console.log(req.cookies.accesstoken);
    // verify token was made by server
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("ERROR at verifying token: " + err.message);
        next();
      } else {
        const userID = decoded.userID;
        const ROLE = decoded.role;
       //// console.log(userID, ROLE);
        let results = await DB_auth.getUserTotalInformation(userID, ROLE);
        if (ROLE==='admin')
        {
          results=['admin']
        }
       //// console.log(results.length,ROLE);

        // if no such user or token doesn't match, do nothing
        if (results.length || ROLE==='admin') 
        {
          req.user =results[0];
          console.log("success verifying");
          next();
        } else throw new Error("error verifying");
      }
    });
  } else {
    console.log(req.cookies.accesstoken);
    throw new Error("last line error");
  }
};

module.exports = verifyJWT;
