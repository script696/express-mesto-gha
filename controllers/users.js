const { NotFoundError } = require("../errors/errors");
const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(500).send({ message: "Произошла ошибка" });
  }
};

module.exports.getUser = async (req, res) => {
  const reqUser = req.params.id;

  try {
    const user = await User.findById(reqUser).orFail(
      new NotFoundError(`Пользователь с id = ${reqUser} не найден`)
    );
    res.send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
};


module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Произошла ошибка" });
  }
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
