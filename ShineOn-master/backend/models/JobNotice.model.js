const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobNoticeSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = JobNotice = mongoose.model('JobNotice', JobNoticeSchema);
