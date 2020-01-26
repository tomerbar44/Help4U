
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
const dbCon = require('./dal/db_connection')
const port = process.env.PORT || 3000;
const io = require('socket.io')(http);
const { updateChatFromSocket } = require('./dal/updateChat');

// chat logic
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
        updateChatFromSocket(socket.taskID, socket.chat);

    });
    socket.on('chat message', function (msg, from) {

        io.emit('chat message', msg, from);

    });

    // we update the socket with task info
    socket.on("update task", function (task) {
        socket.taskID = task.taskID;
        console.log('socket.task\n', socket.taskID);

    })

    // every message sent, we update the chat property of the socket, when user disconnect we will post the new chat 
    socket.on('update chat', function (chat) {
        socket.chat = chat;

    })
});

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





