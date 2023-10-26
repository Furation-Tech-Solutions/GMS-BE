

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: String,
});

export const LogModel = mongoose.model('Log', logSchema);
