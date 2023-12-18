const jwt = require('jsonwebtoken');
const AdminModel = require('../models/Admin.model');

const admin_auth = async (request, response, next) => {
  try {
    const secret = 'desilvakavishkaashan';

    if (secret) {
      if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer')
      ) {
        const authToken = request.headers.authorization.split(' ')[1];
        const decode = jwt.verify(authToken, secret);
        const admin = await AdminModel.findOne({
          _id: decode,
          authToken: authToken,
        });

        if (!admin) {
          throw new Error('User not found');
        }

        request.authToken = authToken;
        request.admin = admin;

        console.log(`Authentication Token for ID ${admin._id} is Accepted`);
        next();
      } else {
        response.status(401);
        throw new Error('Not authorized, no token');
      }
    } else {
      throw new Error('Token Secret is not found');
    }
  } catch (error) {
    console.log(error.message);
    return response.status(401).json({
      message: 'Not authorized, no token',
    });
  }
};

module.exports = {
  admin_auth,
};
