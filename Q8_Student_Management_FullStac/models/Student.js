const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  roll_number: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);