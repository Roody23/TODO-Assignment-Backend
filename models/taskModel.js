const sql = require("../config/db.config.js");

const Task = function (task) {
  this.UserID = task.UserID;
  this.Task_title = task.Task_title;
  this.Task_description = task.Task_description;
  this.Create_date = new Date();
};

Task.getTasks = (userID, result) => {
  sql.query(`SELECT Task_title, Create_date FROM Tasks WHERE UserID = ?`, [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Task.getTask = (userID, taskID, result) => {
  sql.query(`SELECT * FROM Tasks WHERE UserID = ? AND ID = ?`,[userID,taskID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found task: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Task not found
    result({ kind: "not_found" }, null);
  });
};

Task.postTask = (newTask, result) => {
  sql.query("INSERT INTO Tasks SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created task: ", { ID: res.insertId, ...newTask });
    result(null, { ID: res.insertId, ...newTask });
  });
};

Task.updateTask = (userID, taskID, updatedTask, result) => {
  sql.query(`UPDATE Tasks SET Task_title = ?, Task_description = ? WHERE ID = ? AND UserID = ?`, [updatedTask.Task_title, updatedTask.Task_description, taskID, userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // Task not found or not authorized
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated task: ", { ID: taskID, ...updatedTask });
    result(null, { ID: taskID, ...updatedTask });
  });
};

Task.deleteTask = (userID, taskID, result) => {
  sql.query(`DELETE FROM Tasks WHERE ID = ? AND UserID = ?`, [taskID, userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // Task not found or not authorized
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted task with ID: ", taskID);
    result(null, res);
  });
};

module.exports = Task;
