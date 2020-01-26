const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/checkUser', (req, res) => {
    controller.checkUser(req, res);
});

router.post('/createNewUser', (req, res) => {
    controller.createClientUser(req, res);
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
