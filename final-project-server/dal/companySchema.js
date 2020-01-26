const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    name: { type: String, required: true }
});

// read all the companies
companySchema.statics.getAll = async function () {
    return this.find({}, (err) => {
      if (err) { throw err; }
    });
  }

const companyModel = model('companies', companySchema);

module.exports = companyModel;



