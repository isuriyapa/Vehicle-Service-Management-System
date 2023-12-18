const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const grnSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    product: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Grn', grnSchema);
