const express = require("express");
const userRoute = express.Router();
const User = require("../models/user/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

userRoute.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Inthaka mundey vadi chachav, inko email ivvara pulihora raja",
      });
    }
    const salt = crypto.randomBytes(16).toString("hex"); // Generate a salt
    const hashedPassword = crypto
      .pbkdf2Sync(req.body.password, salt, 1000, 64, "sha512")
      .toString("hex");
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      salt: salt,
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

userRoute.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const hashedPassword = crypto
        .pbkdf2Sync(req.body.password, user.salt, 1000, 64, "sha512")
        .toString("hex");
      if (hashedPassword === user.password) {
        let token;
        try {
          token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            "todosusersecretkey",
            { expiresIn: "24h" }
          );
          res.cookie("token", token, { secure: true });
        } catch (err) {
          console.log(err);
          const error = new Error("Error! Something went wrong.");
          return next(error);
        }
        return res
          .status(200)
          .json({ message: "User successfully logged in!", ...user });
      }
      return res.status(400).json({ message: "Invalid username or password" });
    }
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
