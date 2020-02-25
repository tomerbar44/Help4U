module.exports = function (http) {
    const io = require('socket.io')(http);
    const { updateChatFromSocket } = require('./updateChat');

    // chat logic
    io.on('connection', function (socket) {
        
        // every message arrived we updated the db and sending the new message to all clients socket 
        socket.on('chat message', function (msg, from, currTaskID, currTaskChat) {
            try{
                updateChatFromSocket(currTaskID, [...currTaskChat, { from: from, message: msg }]);
                io.emit('chat message', msg, from);
            }catch(e){
                io.emit('DB not updated chat', msg,from, e.message);
            }
        });
    });
    return io;
}