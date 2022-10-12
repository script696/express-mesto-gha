const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { login,createUser } = require("./controllers/users");
const auth = require("./midlewares/auth");
const {loginUserValidation, createUserValidation} = require("./midlewares/validation");

const {PORT = 3000} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,

});


app.post("/signin",  login);
app.post("/signup",  createUser);

app.use("/users", auth,require("./routes/users"));
app.use("/cards", auth, require("./routes/cards"));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode===500 ? "На сервере произошла ошибка" : message });
});

app.listen(PORT, () => {
  console.log("App listening on port ${PORT}");
});