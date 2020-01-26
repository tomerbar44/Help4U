const mongoose = require('mongoose');
const { DB_USER, DB_PASS, DB_HOST } = require('../constants');
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
module.exports = mongoose.connect(url, options);