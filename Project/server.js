const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const query=require("./Database/notificationUpdate");





// configuring .env variables
require('dotenv').config();
const database = require('./Database/database');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');

// need to set this for oracledb connection pool
process.env.UV_THREADPOOL_SIZE = 10;

const PORT = process.env.PORT;

const express = require('express');
const app = express();
const path = require('path');
//const cors = require('cors');
//const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');

// custom middleware logger
app.use(logger);
//middleware for cookies
app.use(cookieParser());

// Cross Origin Resource Sharing
//app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/',express.static(path.join(__dirname, '/public')));
app.use('/',express.static(path.join(__dirname, '/docs')));
app.set('view engine', 'ejs');


//JWTauthorization
//useing my custom verification middleware which reads jwt cookie from user


//route suru

app.get('/',(req, res) => 
{
        res.render('login');
});
//login page a ID and PASSWORD dite hobe.Correct ta dile ->then router will provide me with Jason web token.
//.prottek response a oita use korte hobe 
app.use('/login', require('./routes/authorization'));
//login er por sobsomoy amr verification lagbe
//nahole hobema


app.use(verifyJWT);

app.use('/student',require('./routes/student'))
app.use('/admin',require('./routes/admin'))
app.use('/teacher',require('./routes/teacher'))
app.use('/logout',require('./routes/logout'))







app.all('*', (req, res) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);
const server=app.listen(PORT, async () => {

    try{
        // create database connection pool, log startup message
        await database.startup();
        console.log(`HTTP Server listening on http://localhost:${PORT}`);
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
});

let connectedClients = new Set();
let connectedTeachers = new Set();
let connectedStudents = new Set();

const io = socketio(server)
io.on('connection', (socket) => {
    const cookie=socket.request.headers.cookie;
    
    // Add the client to the connectedClients set
    //connectedClients.add(cookie);
    console.log('A user connected');
    const cookies = cookie.replace('accesstoken=','');
    const payload = jwt.verify(cookies, process.env.JWT_SECRET);
    console.log(payload);
    const role = payload.role;
    if(role=='admin')
    {
        connectedClients.add(socket);
    }
    if(role=='teacher')
    {
        console.log('teacher Connected');
        connectedTeachers.add(socket);
    }
    if(role=='student')
    {
        console.log('Student Connected');
        connectedStudents.add(socket);
    }

    socket.on('disconnect', () => {
      connectedClients.delete(socket); 
      connectedStudents.delete(socket); 
      connectedTeachers.delete(socket);
     // console.log('Admin disconnected');
    });
});

async function sendMessagesPeriodically() {
    setInterval(async () => {
      const result=await query.notificationUpdate();
      for (const socket of connectedClients) {
        if(result.length)
        { 
            const newArray = result.map((obj) => {
                // Create a new object with the existing properties and the new field
                return {
                  ...obj, // Copy existing properties
                  DATE: new Date().toLocaleString()
                };
              });
        console.log(newArray);     
        socket.emit('message', newArray);
        }
      }
    }, 5000);
  }

  
  async function sendMessagesPeriodically2() {
    setInterval(async () => {
      const result=await query.notificationUpdateStudentTeacher();
     // console.log("result",result);
     if(result.length)
     {
     for (const notification of result) 
     {
      //console.log("INSIDENOTIFICATION",notification);

      const { NOTIFICATION_DETAILS, STUDENT_ID, TEACHER_ID, CURRENT_DATE } = notification;
      //console.log(NOTIFICATION_DETAILS);
      if (NOTIFICATION_DETAILS.includes('approved')) 
      {
      
        for (const socket of connectedStudents) 
        {
          const cookie=socket.request.headers.cookie;
          const cookies = cookie.replace('accesstoken=','');
          const payload = jwt.verify(cookies, process.env.JWT_SECRET);
          console.log(payload);
          const id = payload.userID;
          if(id==STUDENT_ID)
          {
            const n = [notification];
           // console.log("STUDENTMSG",notification);
            socket.emit('message',n);
          }
        }
      }


      if (NOTIFICATION_DETAILS.includes('applied')) 
      {

        console.log('inside applied');
        for (const socket of connectedTeachers) 
        {
          const cookie=socket.request.headers.cookie;
          const cookies = cookie.replace('accesstoken=','');
          const payload = jwt.verify(cookies, process.env.JWT_SECRET);
          console.log(payload);
          const id = payload.userID;
          if(id==TEACHER_ID)
          {
            const n=[notification];
            socket.emit('message',n);
          }
        }
      }    
     }
     }
    }, 5000);
  }

  sendMessagesPeriodically();
  sendMessagesPeriodically2();
  


process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT',  database.shutdown);