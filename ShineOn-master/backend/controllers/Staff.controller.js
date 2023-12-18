const StaffModel = require('../models/Staff.model');
const LeaveModel = require('../models/Leave.model');

// Staff Login
const loginStaff = async (request, response, next) => {
  // Get email and password from request body
  const { email, password } = request.body;

  // Check if email and password is provided
  if (email && password) {
    // Check if email exists in database
    await StaffModel.findOne({ email })
      .then(async (staff) => {
        // Check if password is correct
        if (staff && (await staff.matchPassword(password))) {
          // Generate auth token
          const authToken = await staff.generateAuthToken();
          const data = {
            _id: staff._id,
            firstName: staff.firstName,
            lastName: staff.lastName,
            email: staff.email,
            authToken: authToken,
            permissionLevel: staff.permissionLevel,
            profilePicture: staff.profilePicture,
          };

          // Send response
          response.status(200).json({
            success: true,
            message: 'Login successful',
            data: data,
          });
        } else {
          // Throw error if email or password is incorrect
          response.status(400).json({
            success: false,
            message: 'Incorrect email or password',
          });
        }
      })
      // Catch error
      .catch((error) => {
        // Send error response
        response.status(500).json({
          success: false,
          data: {
            message: error.message,
          },
        });
        next();
      });
  } else {
    // Send error response if email or password is not provided
    response.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
    next();
  }
};

// Staff Signup
const signupStaff = async (request, response, next) => {
  // Get name, email and password from request body
  const {
    firstName,
    lastName,
    email,
    password,
    profilePicture,
    dateOfBirth,
    dateOfJoining,
    mobileNumber,
    nic,
    address,
    basicSalary,
  } = request.body;

  // Check if name, email and password is provided
  if (
    firstName &&
    lastName &&
    email &&
    password &&
    profilePicture &&
    dateOfBirth &&
    dateOfJoining &&
    mobileNumber &&
    nic &&
    address &&
    basicSalary
  ) {
    // Create new staff object
    const staff = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      profilePicture: request.body.profilePicture,
      dateOfBirth: request.body.dateOfBirth,
      dateOfJoining: request.body.dateOfJoining,
      mobileNumber: request.body.mobileNumber,
      nic: request.body.nic,
      address: request.body.address,
      basicSalary: request.body.basicSalary,
    };

    // Create new staff
    await StaffModel.create(staff)
      .then(async (staff) => {
        // Generate auth token
        await staff.generateAuthToken();
        const data = {
          _id: staff._id,
          firstName: staff.firstName,
          lastName: staff.lastName,
          email: staff.email,
          authToken: staff.authToken,
          permissionLevel: staff.permissionLevel,
          profilePicture: staff.profilePicture,
        };

        // Send response
        response.status(200).json({
          success: true,
          message: 'Staff created successfully',
          data: data,
        });
        next();
      })
      // Catch error
      .catch((error) => {
        // Send error response
        response.status(500).json({
          success: false,
          message: error.message,
        });
        next();
      });
  } else {
    response.status(400).json({
      success: false,
      message: 'All fields are required',
    });
    next();
  }
};

// Get all Staff
const getAllStaff = async (request, response, next) => {
  try {
    const staff = await StaffModel.find();

    const staffWithTotalLeaves = await Promise.all(
      staff.map(async (staffMember) => {
        const totalLeaves = await LeaveModel.countDocuments({
          staffId: staffMember._id,
          status: 'approved',
        });
        return { ...staffMember._doc, totalLeaves };
      })
    );

    response.status(200).json({ data: staffWithTotalLeaves });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

// Update a Staff by ID
const updateStaffById = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      profilePicture,
      mobileNumber,
      nic,
      address,
    } = req.body;
    const staff = await StaffModel.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        profilePicture,
        mobileNumber,
        nic,
        address,
      },
      { new: true }
    );
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Staff updated successfully',
      data: staff,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Staff by ID - delete all leaves of the staff before deleting the staff
const deleteStaffById = async (req, res) => {
  try {
    const staff = await StaffModel.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    await LeaveModel.deleteMany({ staffId: req.params.id });
    await StaffModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Staff deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one Staff by ID
const getStaffById = async (req, res) => {
  try {
    const staffId = req.staff._id;
    const staff = await StaffModel.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const staffId = req.staff._id;
    const staff = await StaffModel.findById(staffId);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found',
      });
    }
    const { currentPassword, newPassword } = req.body;
    const isMatch = await staff.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }
    staff.password = newPassword;
    await staff.save();
    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Update a Staff by ID
const adminUpdateStaffById = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      profilePicture,
      dateOfBirth,
      dateOfJoining,
      mobileNumber,
      nic,
      address,
      basicSalary,
    } = req.body;
    const staff = await StaffModel.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        profilePicture,
        dateOfBirth,
        dateOfJoining,
        mobileNumber,
        nic,
        address,
        basicSalary,
      },
      { new: true }
    );
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Staff updated successfully',
      data: staff,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  loginStaff,
  signupStaff,
  getAllStaff,
  updateStaffById,
  deleteStaffById,
  getStaffById,
  changePassword,
  adminUpdateStaffById,
};
