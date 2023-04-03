const sql = require("../config/db.config.js");

// User object constructor
const User = function (user) {
  this.Username = user.username;
  this.Email = user.email;
  this.Password = user.password;
};

User.create = (newUser, result) => {
  sql.query("SELECT * FROM Users WHERE Username = ? OR Email = ?", [newUser.Username, newUser.Email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("User already exists");
      result(null, { id: -1 });
      return;
    }

    // User not found, create a new user
    sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId });
    });
  });
};

User.findByUsernameAndPassword = (username, password, result) => {
  sql.query("SELECT ID FROM Users WHERE (Username = ? OR Email = ?) AND Password = ?", [username, username, password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, { ID: res[0].ID });
      return;
    }

    console.log("User not found");
    result(null, { ID: -1 });
  });
};

module.exports = User;
