const  NotFoundError  = require("../errors/errors");
const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err.message}` })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === "ValidationError")
        return res.status(ERROR_CODE).send({
          message: "Ошибка валидации1",
        });
      res.status(500).send({ message: "Произошла ошибка" });
    });
};



module.exports.deleteCard = async (req, res) => {
  const reqCard = req.params.cardId;

  try {
    const card = await Card.findByIdAndRemove(reqCard).orFail(
      new NotFoundError(`карточка с id = '${reqCard}' не найдена`)
    );
    res.send(card);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
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
