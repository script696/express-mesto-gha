const { NotFoundError } = require("../errors/errors");
const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({data : users});
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
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
      return;
    }
    res.status(500).send("Произошла ошибка");
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send(user);
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя.",
        });
        break;
      default:
        res.status(500).send("Произошла ошибка");
    }
  }
};

module.exports.updateMe = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: false,
      }
    ).orFail(new NotFoundError(`Пользователь с указанным id не найден`));
    res.send(user);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
      return;
    }
    switch (err.name) {
      case "ValidationError":
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля.",
        });
        break;
      default:
        res.status(500).send("Произошла ошибка");
    }
  }
};

module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;

  try {
    const updatedAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      }
    ).orFail(new NotFoundError(`Пользователь с указанным id не найден`));
    res.send(updatedAvatar);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
      return;
    }
    switch (err.name) {
      case "ValidationError":
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении фватара.",
        });
        break;
      default:
        res.status(500).send("Произошла ошибка");
    }
  }
};
