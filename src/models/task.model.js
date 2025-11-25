const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 200 },
  description: { type: String },
  status: { type: String, enum: ['todo','in-progress','done'], default: 'todo' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
