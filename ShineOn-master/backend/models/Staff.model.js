const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const StaffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    permissionLevel: {
      type: String,
      default: 'STAFF',
      required: true,
    },
    authToken: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

StaffSchema.pre('save', async function (next) {
  const user = this;
  const password = user.password;

  if (!user.isModified('password')) {
    return next();
  }

  // Number of rounds hash function will execute
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(password, salt);
  user.password = hash;
  return next();
});

StaffSchema.methods.generateAuthToken = async function () {
  const user = this;
  const secret = 'desilvakavishkaashan';

  const authToken = jwt.sign(
    {
      _id: user._id,
      permissionLevel: user.permissionLevel,
    },
    secret
  );
  user.authToken = authToken;
  await user.save();
  return authToken;
};

StaffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Staff', StaffSchema);
