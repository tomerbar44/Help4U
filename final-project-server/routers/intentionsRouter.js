const express = require('express');
const router = express.Router();
const controller = require('../controllers/intentionsController');

router.post('/', (req, res) => {
    controller.addIntentions(req, res);
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
