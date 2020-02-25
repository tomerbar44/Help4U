const express = require('express');
const router = express.Router();
const controller = require('../controllers/companyController');

router.get('/', (req, res) => {
    controller.getCompanies(req, res);
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
