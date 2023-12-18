const Attendance = require('../models/Attendance.model');
const Staff = require('../models/Staff.model');
require('dotenv').config();

// Create a new attendance record
const markAttendance = async (req, res) => {
  const { date, time, status, remarks } = req.body;

  // Validate date, time, status and remarks
  if (!date || !time || !status || !remarks) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required fields',
    });
  }

  try {
    const staffId = req.staff._id;
    const attendance = new Attendance({
      staffId,
      date,
      time,
      status,
      remarks,
    });
    await attendance.save();
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all attendance records for a staff
const getAllAttendanceForStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const attendance = await Attendance.find({ staffId });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// getAllAttendanceForLoggedInStaff
const getAllAttendanceForLoggedInStaff = async (req, res) => {
  try {
    const staffId = req.staff._id;
    const attendance = await Attendance.find({ staffId });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mark attendance for a staff user by email
const markAttendanceByEmail = async (req, res) => {
  const { date, time } = req.query;

  const status = 'present';
  const remarks = 'Present for work';

  try {
    const staff = await Staff.findOne({ email: req.params.email });
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found',
      });
    }
    const attendance = new Attendance({
      staffId: staff._id,
      date,
      time,
      status,
      remarks,
    });
    await attendance.save();
    res.redirect(`${process.env.FRONTEND_URL}/staff#attendance`);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  markAttendance,
  getAllAttendanceForStaff,
  getAllAttendanceForLoggedInStaff,
  markAttendanceByEmail,
};
