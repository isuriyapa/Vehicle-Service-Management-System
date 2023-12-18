const Leave = require('../models/Leave.model');

// Create a new Leave
const insertLeave = async (req, res) => {
  const { startDate, endDate, reason } = req.body;
  // Validate request
  if (!startDate || !endDate || !reason) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required fields',
    });
  }

  try {
    const staffId = req.staff._id;
    const leave = new Leave({ staffId, startDate, endDate, reason });
    await leave.save();
    res.status(201).json({
      success: true,
      message: 'Leave created successfully',
      data: leave,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Leaves
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('staffId');
    res.status(200).json({ data: leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Leaves of a user
const getAllLeavesForUser = async (req, res) => {
  try {
    const leaves = await Leave.find({ staffId: req.params.userId });
    res.status(200).json({ data: leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Leave by ID
const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.status(200).json({ data: leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Leave by ID
const updateLeaveById = async (req, res) => {
  const { staffId, startDate, endDate, reason, status } = req.body;

  // Validate request
  if (!staffId || !startDate || !endDate || !reason || !status) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required fields',
    });
  }

  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { staffId, startDate, endDate, reason, status },
      { new: true }
    );
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res
      .status(200)
      .json({ message: 'Leave updated successfully', data: leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Leave by ID
const deleteLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Leave deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update leave status by ID
const updateLeaveStatusById = async (req, res) => {
  const { id } = req.params; // Extract the leave ID from the request parameters
  const { status } = req.body; // Extract the updated status from the request body

  try {
    // Find the leave by ID and update the status
    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      // If the leave is not found, return an error response
      return res.status(404).json({ error: 'Leave not found' });
    }

    // Return the updated leave as a response
    res.json({
      success: true,
      data: updatedLeave,
    });
  } catch (err) {
    // If an error occurs, return an error response
    res.status(500).json({ error: 'Failed to update leave status' });
  }
};

module.exports = {
  insertLeave,
  getAllLeaves,
  getLeaveById,
  updateLeaveById,
  deleteLeaveById,
  updateLeaveStatusById,
  getAllLeavesForUser,
};
