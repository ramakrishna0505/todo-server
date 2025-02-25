const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("Users", usersSchema);

module.exports = User;
