const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/check', (req, res) => {
    controller.checkUser(req, res);
});

router.post('/create', (req, res) => {
    controller.createClientUser(req, res);
});

router.put('/update', (req, res) => {
    controller.updateToken(req, res);
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
