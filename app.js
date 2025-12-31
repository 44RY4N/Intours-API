const express = require('express');
app = express();
const tourRouter = require(`${__dirname}/routes/tourRouter.js`);
const userRouter = require(`${__dirname}/routes/userRouter.js`);

// MIDDLEWARE SECTION
app.use(express.json()); //middleware to parse json data

app.use((req, res, next) => {
  console.log('Here a middleware ran 👩‍💻🦠');
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

///////////////////////////////////////////////////////
module.exports = app;
