const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema(
  {
    name: {
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
      default: 'ADMIN',
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
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre('save', async function (next) {
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

AdminSchema.methods.generateAuthToken = async function () {
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

AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);
