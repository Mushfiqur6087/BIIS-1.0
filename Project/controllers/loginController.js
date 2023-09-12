const users = require("../Database/userLoginInformation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getUserInformationByUsernameAndPassword(username, password) {
  const userInformation = await users.getUserInformation();
  const filteredUser = userInformation.filter(
    (user) => String(user.USER_ID) === String(username)
  );
  return filteredUser;
}

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = await getUserInformationByUsernameAndPassword(
    username,
    password
  );
  console.log(foundUser,"founduser")
  //console.log(foundUser);
  if (foundUser.length)
  { // Unauthorized
  //we need to  evaluate password now
  const match = await bcrypt.compare(String(password), foundUser[0].PASSWORD);

  if (match) 
  {
    // create JWTs for authentication
    // creating token

    const token = jwt.sign(
      {
        userID: username,
        role: foundUser[0].ROLE,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("accesstoken", token, { maxAge: 3600000, httpOnly: true });
    //res.json({accesstoken});
    if(foundUser[0].ROLE=='student')
    {
      res.redirect('/student');
    }
    else if(foundUser[0].ROLE== 'admin')
    {
      res.redirect('/admin');
    }

    else 
    {
      res.redirect('/teacher');
    }


  } else 
  {
    res.status(403).contentType('text/html').send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error 403 - Wrong Password</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #3498db; /* Blue background color */
            }
    
            .error-message {
                font-size: 48px;
                text-align: center;
                text-transform: uppercase;
                color: #fff; /* White text color */
                background-color: #e74c3c; /* Red background color */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            }
        </style>
    </head>
    <body>
        <div class="error-message">Wrong Password Entered</div>
    </body>
    </html>
    
  `);
  }
}
else
{
  res.status(404).contentType('text/html').send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error 404 - Wrong Username</title>
      <style>
          body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #3498db; /* Blue background color */
          }
  
          .error-message {
              font-size: 48px;
              text-align: center;
              text-transform: uppercase;
              color: #fff; /* White text color */
              background-color: #e74c3c; /* Red background color */
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
          }
      </style>
  </head>
  <body>
      <div class="error-message">Wrong Username Entered</div>
  </body>
  </html>
  
`);

}
};


module.exports = { handleLogin };
