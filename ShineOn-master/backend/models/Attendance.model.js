const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema(
  {
    staffId: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'present',
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Attendance = mongoose.model('Attendance', AttendanceSchema);
