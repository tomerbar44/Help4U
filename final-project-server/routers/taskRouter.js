const express = require('express');
const url = require("url");
const router = express.Router();
const controller = require('../controllers/taskController');


router.get('/getTasksByUID', (req, res) => {
    const urlObject = url.parse(req.url, true, false);
    req.userID = urlObject.query.userID;
    controller.getTasksUser(req, res);
});

router.get('/getTasksByCID', (req, res) => {
    const urlObject = url.parse(req.url, true, false);
    req.companyID = urlObject.query.companyID;
    controller.getTasksCompany(req, res);
});

router.post('/addTask', (req, res) => {
    controller.createNewTask(req, res);
});

router.put('/updateStatus', (req, res) => {
    const urlObject = url.parse(req.url, true, false);
    req.taskID = urlObject.query.taskID;
    controller.updateStatusTask(req, res);
});

router.put('/updateChat', (req, res) => {
    const urlObject = url.parse(req.url, true, false);
    req.taskID = urlObject.query.taskID;
    controller.updateChatTask(req, res);
});

router.delete('/deleteTask', (req, res) => {
    const urlObject = url.parse(req.url, true, false);
    req.taskID = urlObject.query.taskID;
    controller.deleteTask(req, res);
});

// default route 
router.all('*', (req, res) => {
    res.status(404).json({
        status:404,
        message: "Wrong route",
        action: "Unknown",
        data: null
    })
});
module.exports = router;