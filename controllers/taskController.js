const Task = require("../models/taskModel");

// Get all tasks for a user
exports.getTasks = (req, res) => {
  Task.getTasks(req.body.userID, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    } else {
      res.status(200).json(data);
    }
  });
};

// Get a single task for a user
exports.getTask = (req, res) => {
  Task.getTask(req.body.userID, req.body.taskID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Task with ID ${req.body.taskID} not found.`,
        });
      } else {
        res.status(500).json({
          message: `Error retrieving task with ID ${req.body.taskID}.`,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Create a new task
exports.postTask = (req, res) => {
  // Validate request
  if (!req.body.UserID || !req.body.Task_title || !req.body.Task_description) {
    res.status(400).json({
      message: "Content cannot be empty.",
    });
    return;
  }

  // Create a task
  const task = new Task({
    UserID: req.body.UserID,
    Task_title: req.body.Task_title,
    Task_description: req.body.Task_description,
  });

  Task.postTask(task, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the task.",
      });
    } else {
      res.status(201).json(data);
    }
  });
};

// Update a task
exports.putTask = (req, res) => {
  // Validate request
  if (!req.body.Task_title || !req.body.Task_description) {
    res.status(400).json({
      message: "Content cannot be empty.",
    });
    return;
  }

  Task.updateTask(
    req.body.userID,
    req.body.taskID,
    new Task({
      Task_title: req.body.Task_title,
      Task_description: req.body.Task_description,
    }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Task with ID ${req.body.taskID} not found.`,
          });
        } else {
          res.status(500).json({
            message: `Error updating task with ID ${req.body.taskID}.`,
          });
        }
      } else {
        res.status(200).json(data);
      }
    }
  );
};

// Delete a task
exports.delTask = (req, res) => {
  Task.deleteTask(req.body.userID, req.body.taskID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Task with ID ${req.body.taskID} not found.`,
        });
      } else {
        res.status(500).json({
          message: `Could not delete task with ID ${req.body.taskID}.`,
        });
      }
    } else {
      res.status(200).json({
        message: `Task with ID ${req.body.taskID} was deleted successfully!`,
      });
    }
  });
};
