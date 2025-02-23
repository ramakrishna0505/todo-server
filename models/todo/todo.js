const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: "todo" },
  endDate: Date,
  notes: String,
  priority: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ToDo = todoSchema.model("ToDo", todoSchema);

module.exports = ToDo;
