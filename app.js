const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/user");
const todoRoute = require("./routes/todo");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(cookieParser());

app.use(verifyToken);

function verifyToken(req, res, next) {
  if (req.path.split("/")[1] !== "user") {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Unauthorized User!" });
    }
    jwt.verify(token, "todosusersecretkey", (error, decoded) => {
      if (error) {
        return res.status(498).json({ message: "Invalid token!" });
      }
      next();
    });
  } else {
    next();
  }
}

app.use("/user", userRoute);
app.use("/todo", todoRoute);

mongoose
  .connect("mongodb://localhost:27017/", {
    dbname: "tododb",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(3000);
