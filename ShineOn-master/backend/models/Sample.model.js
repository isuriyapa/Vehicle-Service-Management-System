const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SampleSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Sample = mongoose.model('Sample', SampleSchema);
