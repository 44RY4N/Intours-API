const express = require('express');
app = express();
const tourRouter = require(`${__dirname}/routes/tourRouter.js`);

// MIDDLEWARE SECTION
app.use(express.json()); //middleware to parse json data

app.use((req, res, next) => {
  console.log('Here a middleware ran 👩‍💻🦠');
  next();
});

app.use('/api/v1/tours', tourRouter);

///////////////////////////////////////////////////////
module.exports = app;
