
/**
 * 
 * @author Tal-Adivi 
 * @author Tomer-Bar
 *  
 * 
 *          @project 
 * server side application
 *  
 *  */


require('dotenv').config();
// api 
const app = require('./app');
const http = require('http').createServer(app);
const dbCon = require('./db_connection')
const port = process.env.PORT || 3000;
require('./chat/chat')(http);

// connect to server and then to db
http.listen(port, () => {
    console.log(`listening on port ${port}`);
    dbCon.then(() => {
        console.log('connected to db')
    })
        .catch(err => {
            console.log('fail to connect db', err.message)
        });
});




