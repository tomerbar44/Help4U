const nlpAlgorithm = require('../nlp/nlp');

async function addIntentions(req, res) {
    try {
        const data = await nlpAlgorithm.trainAlgo(req.body.text,req.body.subject,req.body.google_id,req.body.access_token);
        if (data == true) {
            res.status(200).json({
                status:200,
                message: "success",
                action: "Create",
                data: data
            });
        } else {
            res.status(200).json({
                status:200,
                message: "The user does not have permission to add intentions / The fields are missing",
                action: "Create",
                data: data 
            })
        }
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Create",
            data: null
        })
    }
}


module.exports = {
    addIntentions
};