const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    default: "todo",
    enum: ["todo", "inprogress", "done"],
  },
  endDate: { type: Date, default: Date.now },
  notes: String,
  priority: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ToDo = mongoose.model("ToDos", todosSchema);

module.exports = ToDo;
