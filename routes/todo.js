const express = require("express");
const ToDo = require("../models/todo/todo");
const User = require("../models/user/user");
const todoRoute = express.Router();

todoRoute.post("/create", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const todo = new ToDo({
        title: req.body.todo.title,
        status: req.body.todo.status,
        userId: user._id,
      });
      await todo.save();
      return res.status(201).json({
        message:
          "list lu add cheyyadam mathrame kadhu adhi poorthi kuda cheyyali, aa pani meeda undu, chaduvukondi firstuu",
        todo,
      });
    }
    return res.status(404).json({
      message:
        "ikkada oka user undali evariki aina dorikinda? dorikithey daya chesi dr samaram ki sampradinchandi",
    });
  } catch (error) {
    console.error("Oka chakkati catch", error);
    console.error("Edo penta chesav chusko ra champaklal");
    return res.status(500).json({
      message:
        "Maa server lo oka problem vachindi dayachesi kasepu aagi prayathnichandi",
    });
  }
});

todoRoute.get("/get", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const todos = await ToDo.find({ userId: user._id });
      return res.status(200).json({ todos });
    }
    return res.status(404).json({ message: "yevaru kavalamma neeku?" });
  } catch (error) {
    console.error("Oka chakkati catch", error);
    console.error("Edo penta chesav chusko ra champaklal");
    return res.status(500).json({
      message:
        "Maa server lo oka problem vachindi dayachesi kasepu aagi prayathnichandi",
    });
  }
});

todoRoute.put("/edit", async (req, res) => {
  try {
    const updateTodo = await ToDo.findOneAndUpdate(
      { _id: req.body.todo._id },
      { ...req.body.todo }
    );
    if (updateTodo) {
      await updateTodo.save();
      const todos = await ToDo.find({ userId: req.body.todo.userId });
      return res.status(200).json({ todos });
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

todoRoute.delete("/delete", async (req, res) => {
  try {
    const deleteTodo = await ToDo.findByIdAndDelete(req.body.todo._id);
    if (deleteTodo) {
      await deleteTodo.save();
      const todos = await ToDo.find({ userId: req.body.todo.userId });
      return res.status(200).json({ todos });
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

module.exports = todoRoute;
