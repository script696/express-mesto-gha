const User = require("../models/user");

module.exports.getUsers = (req, res) => {};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(console.log("Success"))
    .catch((err) => console.log(err));
};
