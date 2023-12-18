const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    SuppllieId: {
      type: String,
      required: true,
    },
    SuppllierName: {
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
    ItemId: {
      type: String,
      required: true,
    },
    ItemName: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Supplier', supplierSchema);
