const express = require('express');
const router = express.Router();
const controller = require('../controllers/companyController');

router.get('/getCompanies', (req, res) => {
    controller.getCompanies(req, res);
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
