const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path');

const taskApi = require('./routers/taskRouter');
const subjectApi = require('./routers/subjectRouter');
const companyApi = require('./routers/companyRouter');
const userApi = require('./routers/userRouter');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.use(express.static(path.join(__dirname,"../final-project-app/build") ));
app.get("*",(req,res) => {
  app.use((req,res) => res.sendFile(path.join(__dirname,"../../final-project-app/build/index.html")));
});



app.use(
 (req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept');
   res.set('Content-Type', 'application/json');
   next();
 });

// routes for all api services
app.use('/Help4U/task', taskApi);
app.use('/Help4U/subject', subjectApi);
app.use('/Help4U/company', companyApi);
app.use('/Help4U/user', userApi);

module.exports = app;