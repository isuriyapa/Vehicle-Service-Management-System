const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FAQSchema = new Schema({
  name: {
    type: String,
  },
  issue: {
    type: String,
  },
  email: {
    type: String,
  },
  answer: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = FAQ = mongoose.model('FAQ', FAQSchema);
