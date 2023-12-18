const jwt = require('jsonwebtoken');
const StaffModel = require('../models/Staff.model');

const staff_auth = async (request, response, next) => {
  try {
    const secret = 'desilvakavishkaashan';

    if (secret) {
      if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer')
      ) {
        const authToken = request.headers.authorization.split(' ')[1];
        const decode = jwt.verify(authToken, secret);
        const staff = await StaffModel.findOne({
          _id: decode,
          authToken: authToken,
        });

        if (!staff) {
          throw new Error('User not found');
        }

        request.authToken = authToken;
        request.staff = staff;

        console.log(`Authentication Token for ID ${staff._id} is Accepted`);
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
  staff_auth,
};
