const AdminModel = require('../models/Admin.model');

// Admin Login
const loginAdmin = async (request, response, next) => {
  // Get email and password from request body
  const { email, password } = request.body;

  // Validate email and password
  if (email && password) {
    // Check if email exists in database
    await AdminModel.findOne({ email })
      .then(async (admin) => {
        // Check if password is correct
        if (admin && (await admin.matchPassword(password))) {
          // Generate auth token
          const authToken = await admin.generateAuthToken();
          const data = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            authToken: authToken,
            permissionLevel: admin.permissionLevel,
            profilePicture: admin.profilePicture,
          };

          // Send response
          response.status(200).json({
            success: true,
            data: data,
          });
        } else {
          // Throw error if email or password is incorrect
          throw new Error('Invalid Email or Password!');
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
      data: 'Email or Password is missing',
    });
    next();
  }
};

// Admin Signup
const signupAdmin = async (request, response, next) => {
  // Get name, email and password from request body
  const { name, email, password, profilePicture } = request.body;

  // Validate name, email, password and profilePicture
  if (name && email && password && profilePicture) {
    // Create new admin object
    const admin = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      profilePicture: request.body.profilePicture,
    };

    // Create new admin
    await AdminModel.create(admin)
      .then(async (admin) => {
        // Generate auth token
        await admin.generateAuthToken();
        const data = {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          authToken: admin.authToken,
          permissionLevel: admin.permissionLevel,
          profilePicture: admin.profilePicture,
        };

        // Send response
        response.status(200).json({
          success: true,
          data: data,
        });
        next();
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
    // Send error response if name, email or password is not provided
    response.status(400).json({
      success: false,
      data: 'Name, Email or Password is missing',
    });
    next();
  }
};

module.exports = {
  loginAdmin,
  signupAdmin,
};
