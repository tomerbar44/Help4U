const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    from: { type: String, required: true },
    message: { type: String, required: true }
});

const userModel = require('./userSchema');
const nlpAlgorithm = require('../nlp/nlp');

const taskSchema = new Schema({
    taskID: {
        type: Number,
        index: true,
        unique: true
    },
    userID: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    companyID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    datesend: {
        type: Date
    },
    datecomplete: {
        type: Date
    },
    status: {
        type: String,
        default:'Active'
    },
    selectedSubject: {
        type: String
    },
    chat: [messageSchema]
});

/**
 * Schema logic
 */

// create task by sending parameters in the body request, status && date send && taskID create by the server , 
// selectedSubject create by Naive Bayes classifier algorithm on the request title
taskSchema.statics.insertNewTask = async function (body) {
    const classifySubject=nlpAlgorithm.findMeaning(body.title);
    let taskObj = new this({
        taskID:Date.now(),
        userID: body.userID,
        userName:body.userName,
        companyID: body.companyID,
        datesend:Date.now(),
        title: body.title,
        selectedSubject: classifySubject,
        chat: body.chat
    });
    return await taskObj.save();
}

// read tasks by user ID
taskSchema.statics.findTasksUser = function (userID) {
    return this.find({ userID: userID }, function (err) {
        if (err) {
            throw err;
        }
    });
}

// read tasks by company ID , before check if the user is admin and have updated access token in our db (send in the header request)
taskSchema.statics.findTasksCompany = async function (companyID,google_id, access_token) {
    try{
        const data = await userModel.checkToken(google_id, access_token);
        if(data==null) return -1;
    }
    catch (err) { throw err;}
    return this.find({ companyID: companyID }, function (err) {
        if (err) {
            throw err;
        }
    });
}

// update status by task ID , only if status=Active, change status to Completed and create complete date by date now , 
// before check if the user is admin and have update access token in our db 
taskSchema.statics.updateStatus = async function (taskID,google_id, access_token) {
    try{
        const data = await userModel.checkToken(google_id, access_token);
        if(data==null) return -1;
    }
    catch (err) { throw err;}
    return await this.findOneAndUpdate({ taskID: taskID, status: "Active" }, { $set: { status: "Completed", datecomplete: Date.now() } }, { new: true });
}

// update chat array by task ID , updated chat sent to request body
taskSchema.statics.updateChat = async function (req) {
    return await this.findOneAndUpdate({ taskID: req.taskID }, { $set: { chat: req.body.chat } }, { new: true });
}

// delete task by task ID , only if status=Completed
// before check if the user is admin and have update access token in our db
taskSchema.statics.deleteTaskFromDb = async function (taskID,google_id, access_token) {
    try{
        const data = await userModel.checkToken(google_id, access_token);
        if(data==null) return -1;
    }
    catch (err) { throw err;}
    return await this.findOneAndDelete({ taskID: taskID, status: "Completed" });
}


const taskModel = model('tasks', taskSchema);
module.exports = taskModel;



