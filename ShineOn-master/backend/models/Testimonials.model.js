const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestimonialsSchema = new Schema({
  userName: {
    type: String,
  },
  feedback: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  userProfileImage: {
    type: String,
  }
});

module.exports = Testimonials = mongoose.model(
  'Testimonials',
  TestimonialsSchema
);
