const express = require('express');
const app = express();
const { getTours, getTourById, postTour, patchTour, deleteTour } = require(
  `${__dirname}/tours.js`,
);
const PORT = 8000;
app.use(express.json()); //middleware to parse json data

app.use((req, res, next) => {
  console.log('Here a middleware ran 👩‍💻🦠');
  next();
});

//getting all tours //adding a new tour
app.route('/api/v1/tours').get(getTours).post(postTour);

//get tour by id //patching a tour by ID //delte a tour
app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(patchTour)
  .delete(deleteTour);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
