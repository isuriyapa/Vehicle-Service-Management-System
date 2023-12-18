const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    buying: {
      type: Number,
      required: true,
    },
    selling: {
      type: Number,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('stock', stockSchema);
