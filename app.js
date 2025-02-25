const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/user");
const todoRoute = require("./routes/todo");
const app = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/todo", todoRoute);

mongoose
  .connect("mongodb://localhost:27017/", {
    dbname: "tododb",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(3000);
