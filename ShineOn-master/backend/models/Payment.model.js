const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  appointmentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'PENDING',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = Payment = mongoose.model('Payment', paymentSchema);
