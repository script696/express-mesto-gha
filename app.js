const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express(); 



mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  
});

app.get('/', (req, res) => {
  const {name, age} = req.query
  console.log(req)
  res.send(
        `<html>
        <body>
        <h1>Privet Nikit1111a</h1>
            <p>Ответ на сигнал из далёкого космоса</p>
            <p>${name}</p>
            <p>${age}</p>
        </body>
        </html>`
    );
}); 


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
}) 