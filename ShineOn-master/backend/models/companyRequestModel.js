const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyRequestSchema = new Schema(
  {
    CompanyCode: {
      type: String,
      required: true,
    },
    CompanyName: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    ContactNumber: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Product: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CompanyRequest = mongoose.model('CompanyRequest', CompanyRequestSchema);
module.exports = CompanyRequest;
