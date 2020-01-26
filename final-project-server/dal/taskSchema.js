const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    from: { type: String, required: true },
    message: { type: String, required: true }
});

const taskSchema = new Schema({
    taskID: {
        type: Number,
        index: true,
        unique: true,
        default:Date.now()
    },
    userID: {
        type: Number,
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
        type: Date,
        default:Date.now()
    },
    datecomplete: {
        type: Date
    },
    status: {
        type: String,
        default:'Active'
    },
    selectedSubject: {
        type: String,
        required: true
    },
    chat: [messageSchema]
});

/**
 * Schema logic
 */

// create task by sending parameters in the body request, status && date send && taskID create by the server
taskSchema.statics.insertNewTask = async function (body) {
    let taskObj = new this({
        userID: body.userID,
        companyID: body.companyID,
        title: body.title,
        selectedSubject: body.selectedSubject,
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

// read tasks by company ID
taskSchema.statics.findTasksCompany = function (companyID) {
    return this.find({ companyID: companyID }, function (err) {
        if (err) {
            throw err;
        }
    });
}

// update status by task ID , only if status=Active, change status to Completed and create complete date by date now
taskSchema.statics.updateStatus = async function (taskID) {
    return await this.findOneAndUpdate({ taskID: taskID, status: "Active" }, { $set: { status: "Completed", datecomplete: Date.now() } }, { new: true });
}

// update chat array by task ID , updated chat sent to request body
taskSchema.statics.updateChat = async function (req) {
    console.log('req.taskID\n\n',req.taskID);
    return await this.findOneAndUpdate({ taskID: req.taskID }, { $set: { chat: req.body.chat } }, { new: true });
}

// delete task by task ID , only if status=Completed
taskSchema.statics.deleteTaskFromDb = async function (taskID) {
    return await this.findOneAndDelete({ taskID: taskID, status: "Completed" });
}


const taskModel = model('tasks', taskSchema);
module.exports = taskModel;



