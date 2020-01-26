const express = require('express');
const router = express.Router();
const controller = require('../controllers/subjectController');

router.get('/getSubjects', (req, res) => {
    controller.getSubjects(req, res);
});

router.all('*', (req, res) => {
    res.status(404).json({
        status:404,
        message: "Wrong route",
        action: "Unknown",
        data: null
    })
});

module.exports = router;
