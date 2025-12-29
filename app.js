const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json()); //middleware to parse json data

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to Intours API',
//     app: 'Intours',
//   });
// });

//getting all tours
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: tours });
});

//adding a new tour
app.post('/api/v1/tours', (req, res) => {
  newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 'fail', message: 'Internal Server Error' });
      }
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
