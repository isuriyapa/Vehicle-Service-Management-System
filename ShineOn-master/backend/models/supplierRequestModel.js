const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierRequestSchema = new Schema(
  {
    chooseItem: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    typeOfNeedService: {
      type: String,
      required: true,
    },
    addingAcomment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SupplierRequest = mongoose.model(
  'SupplierRequest',
  SupplierRequestSchema
);
module.exports = SupplierRequest;
