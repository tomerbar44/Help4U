const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
    name: { type: String, required: true }
});

// read all the subjects
subjectSchema.statics.getAll = async function () {
    return this.find({}, (err) => {
      if (err) { throw err; }
    });
  }

const subjectModel = model('subjects', subjectSchema);

module.exports = subjectModel;



