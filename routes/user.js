const express = require("express");
const userRoute = express.Router();
const User = require("../models/user/user");

userRoute.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Inthaka mundey vadi chachav, inko email ivvara puka",
      });
    }
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.username,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "Chusindi chalu le login avvara labbe", user: newUser });
  } catch (error) {
    console.error("Oka chakkati catch", error);
    console.error("Edo penta chesav chusko ra champaklal");
    return res.status(500).json({
      message:
        "Maa server lo oka problem vachindi dayachesi kasepu aagi prayathnichandi",
    });
  }
});

module.exports = userRoute;
