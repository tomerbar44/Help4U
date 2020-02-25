const model = require('../models/companySchema');

async function getCompanies(req, res) {
    try {
        const data = await model.getAll();
        if (data.length == 0) {
            res.status(200).json({
                status:200,
                message: "No companies was found",
                action: "Read",
                data: null
            });
        } else {
            res.status(200).json({
                status:200,
                message: "success",
                action: "Read",
                data: data //array of companies
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


module.exports = {
    getCompanies
};