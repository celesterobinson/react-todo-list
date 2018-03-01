const express = require("express");
const todoRoute = express.Router();
const Todo = require("../models/todo");
const expressJwt = require("express-jwt");

// GET
todoRoute.get("/", (req, res) => {
    const query = {};
    query.user = req.user._id;
    Todo.find(query, (err, todos) => {
        if (err) return res.status(500).send(err);
        return res.send(todos);
    });
});

// POST
todoRoute.post("/", (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.user = req.user._id;
    newTodo.save((err, savedTodo) => {
        if (err) return res.status(500).send(err);
        return res.send(savedTodo);
    });
});

// GET ONE
todoRoute.get("/:_id", (req, res) => {
    Todo.findOne({ _id: req.params._id, user: req.user._id }, (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.send(todo);
    });
});

// PUT 
todoRoute.put("/:_id", (req, res) => {
    Todo.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true }, (err, updatedTodo) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedTodo);
    });
});

// DELETE 
todoRoute.delete("/:_id", (req, res) => {
    Todo.findOneAndRemove({ _id: req.params.id, user: req.user._id }, (err, deletedTodo) => {
        if (err) return res.status(500).send(err);
        return res.send(deletedTodo);
    });
});

module.exports = todoRoute;

