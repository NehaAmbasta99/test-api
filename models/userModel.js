const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name:{type: String, required: true},
  profileImage: {
    data: Buffer, // Buffer to store binary data
    contentType: String, // MIME type of the image
  },
  phoneNumber: {
    type: String,
  },
  location: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;