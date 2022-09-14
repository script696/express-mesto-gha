const { NotFoundError, ValidationError } = require("../errors/errors");
const Card = require("../models/card");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.send(card);
  } catch (err) {
    console.log(err.message);
    throw new ValidationError(`Пока не суть что тут написано`);
    res.status(400).send(err.message);
  }
};

module.exports.deleteCard = async (req, res) => {
  const reqCard = req.params.cardId;

  try {
    const card = await Card.findByIdAndRemove(reqCard).orFail(
      new NotFoundError(`карточка с id = '${reqCard}' не найдена`)
    );
    res.send(card);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
