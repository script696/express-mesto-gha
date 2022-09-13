const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUser = (req, res) => {
  const reqUser = req.params.id;
  User.findById(reqUser)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.updateMe = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.params.cardId,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  );
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.params.cardId,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  );
};
