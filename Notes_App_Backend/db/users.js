const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION);

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
    }]
  }, {
    timestamps: true,
  });
  
  const User = mongoose.model('User', UserSchema);
  module.exports = User;
  
