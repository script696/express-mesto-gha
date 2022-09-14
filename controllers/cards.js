const { NotFoundError } = require("../errors/errors");
const Card = require("../models/card");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (err) {
    res.status(500).send({ message: "Произошла ошибка" });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.send({ data: card });
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки.",
        });
        break;
      default:
        res.status(500).send("Произошла ошибка");
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  const reqCard = req.params.cardId;

  try {
    const card = await Card.findByIdAndRemove(reqCard).orFail(
      new NotFoundError("карточка с указанным id не найдена")
    );
    res.send({ data: card });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
      return;
    }
    res.status(500).send("Произошла ошибка");
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const likes = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(new NotFoundError("карточка с указанным id не найдена"));
    res.send({ data: likes });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
      return;
    }
    switch (err.name) {
      case "ValidationError":
        res.status(400).send({
          message: "Переданы некорректные данные для подстановки/снятия лайка.",
        });
        break;
      default:
        res.status(500).send("Произошла ошибка");
    }
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const likes = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(new NotFoundError("карточка с указанным id не найдена"));
    res.send({ data: likes });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
      return;
    }
    switch (err.name) {
      case "ValidationError":
        res.status(400).send({
          message: "Переданы некорректные данные для подстановки/снятия лайка.",
        });
        break;
      default:
        res.status(500).send("Произошла ошибка");
    }
  }
};
