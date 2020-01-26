const taskModel = require('./taskSchema');


/**
 * 
 * when user disconnected or exit the chat, we want to update the chat of the task.
 * 
 */


async function updateChatFromSocket(taskID, chat) {

    // partialReq created like this because we want to keep using the same structure of the original req object (that came from the API request)
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
        console.log(e);       
    }
}  
module.exports = {
    updateChatFromSocket
} 