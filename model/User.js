const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// not using arrow functions in mongoose middleware
// to maintain the lexical 'this' on the object that is
// being saved.
UserSchema.pre('save', async function preSave() {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return undefined;

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return undefined;
});

// not using arrow functions in mongoose instance method
// to maintain the lexical 'this' on the instance object
UserSchema.methods.isValidPassword = async function isValidPassword(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
