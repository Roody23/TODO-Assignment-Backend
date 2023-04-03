const User = require('../models/userModel');

exports.signup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User object
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Find the user by username and password
  User.findByUsernameAndPassword(req.body.username, req.body.password, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while logging in.",
      });
    } else {
      res.send(data);
    }
  });
};
