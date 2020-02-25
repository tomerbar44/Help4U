const taskModel = require('../models/taskSchema');

async function updateChatFromSocket(taskID, chat) {

    let partialReq = {
        taskID,
        body : {
            chat   
        }
    }
    try{
       await taskModel.updateChat(partialReq)
    }
    catch(e) {
        throw e;
    }
}  
module.exports = {
    updateChatFromSocket
} 