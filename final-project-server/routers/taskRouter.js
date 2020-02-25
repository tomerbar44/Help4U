const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');


router.get('/user/:userID', (req, res) => {
    controller.getTasksUser(req, res);
});

router.get('/company/:companyID', (req, res) => {
    controller.getTasksCompany(req, res);
});

router.post('/add', (req, res) => {
    controller.createNewTask(req, res);
});

router.put('/update/:taskID', (req, res) => {
    controller.updateStatusTask(req, res);
});

router.delete('/:taskID', (req, res) => {
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