const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  vehicleNumbers: {
    type: [String], // specify that the field should be an array of strings
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = Company = mongoose.model('Company', CompanySchema);
