const model = require('../models/subjectSchema');

async function getSubjects(req, res) {
    try {
        const data = await model.getAll();
        if (data.length == 0) {
            res.status(200).json({
                status:200,
                message: "No subjects was found",
                action: "Read",
                data: null
            });
        } else {
            res.status(200).json({
                status:200,
                message: "success",
                action: "Read",
                data: data //array of subjects
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
    getSubjects
};