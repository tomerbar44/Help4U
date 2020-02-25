const model = require('../models/taskSchema');


async function getTasksUser(req, res) {
    try {
        const data = await model.findTasksUser(req.params.userID);
        if (data.length == 0) {
            res.status(200).json({
                status:200,
                message:"No tasks was found for this user ID",
                action: "Read",
                data: null
            });
        } else {
            res.status(200).json({
                status:200,
                message: "success",
                action: "Read",
                data: data //array of tasks
            })
        }
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Read",
            data: null
        })
    }
}

async function getTasksCompany(req, res) {
    try {
        const data = await model.findTasksCompany(req.params.companyID,req.headers.google_id ,req.headers.access_token);
        if (data.length == 0) {
            res.status(200).json({
                status:200,
                message: "No tasks was found for this company ID",
                action: "Read",
                data: null
            });
        } else if (data == -1) {
            res.status(403).json({
                status:403,
                message: "The user does not have permission",
                action: "Read",
                data: null
            });
        }else {
            res.status(200).json({
                status:200,
                message: "success",
                action: "Read",
                data: data //array of tasks
            })
        }
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Read",
            data: null
        })
    }
}



async function createNewTask(req, res) {
    try {
        
        const data = await model.insertNewTask(req.body);
        res.status(200).json({
            status:200,
            message: "success",
            action: "Create",
            data: data
        })

    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Create",
            data: null
        })
    }
}

async function updateStatusTask(req, res) {
    try {
        const data = await model.updateStatus(req.params.taskID,req.body.google_id,req.body.access_token);
        if (data == null) {
            res.status(200).json({
                status:200,
                message: "No task / task with status active was found for this task ID",
                action: "Update",
                data: null
            });
        }else if (data == -1) {
            res.status(403).json({
                status:403,
                message: "The user does not have permission to update status",
                action: "Update",
                data: null
            });
        }else {
            res.status(200).json({
                status:200,
                message: "success",
                action: "Update",
                data: data
            })
        }
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Update",
            data: null
        })
    }
}


async function updateChatTask(req, res) {
    try {
        const data = await model.updateChat(req);
        if (data == null) {
            res.status(200).json({
                status:200,
                message: "No task was found for this task ID",
                action: "Update",
                data: null
            });
        }else {
            res.status(200).json({
                status:200,
                message: "success",
                action: "Update",
                data: data
            })
        }
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Update",
            data: null
        })
    }
}

async function deleteTask(req, res) {
    try {
    
        const data = await model.deleteTaskFromDb(req.params.taskID,req.body.google_id,req.body.access_token);
        if (data == null) {
            res.status(200).json({
                status:200,
                message: "No task / task with status active was found for this task ID",
                action: "Delete",
                data: null
            });
        }else if (data == -1) {
            res.status(403).json({
                status:403,
                message: "The user does not have permission to delete",
                action: "Delete",
                data: null
            });
        } else {
            res.status(200).json({
                status:200,
                message: "success",
                action: "Delete",
                data: data
            })
        }
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Delete",
            data: null
        })
    }
}

module.exports = {
    getTasksUser,
    createNewTask,
    updateStatusTask,
    updateChatTask,
    getTasksCompany,
    deleteTask
};