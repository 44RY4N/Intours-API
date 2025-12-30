const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8000;
const filter = require('./filter.js');

app.use(express.json()); //middleware to parse json data
const tours = JSON.parse(fs.readFileSync('./dev-data/data/csvjson.json'));

//getting all tours
app.get('/api/v1/tours', (req, res) => {
  let filteredTours, filteredTourData;
  const isFilter = req.query.filter === 'true'; //convert to boolean

  //for sort requests
  if (isFilter) {
    filteredTours = filter(tours, req.query);
    filteredTourData = filteredTours.data;
  } else filteredTourData = tours;

  // for page requests
  if (req.query.page) {
    let limit = 10;
    let page = req.query.page * 1 || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTours = filteredTourData.slice(startIndex, endIndex);
    res.status(200).json({
      status: 'success',
      result: paginatedTours.length,
      filter: isFilter,
      meta: filteredTours.meta,
      data: paginatedTours,
    });
  }
  // else send back all tours
  else {
    res.status(200).json({
      status: 'success',
      result: tours.length,
      filter: isFilter,
      data: tours,
    });
  }
});

app.get('/api/v1/tours/:id', (req, res) => {
  const ID = req.params.id * 1;
  const tour = tours.find((el) => el.Serial === ID);
  if (!tour || !Number.isInteger(ID)) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid ID Recieved/Tour not Found' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
});

//adding a new tour
app.post('/api/v1/tours', (req, res) => {
  const newID = tours[tours.length - 1].Serial + 1;
  console.log(tours.length);
  const newTour = Object.assign({ Serial: newID }, req.body);
  tours.push(newTour);
  fs.writeFile('./dev-data/data/csvjson.json', JSON.stringify(tours), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'Internal Server Error' });
    }
    console.log('Successfully added a new Tour ✅');
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  });
});

// patching a tour by ID

app.patch('/api/v1/tours/:id', (req, res) => {
  const ID = Number(req.params.id);
  const index = tours.findIndex((tour) => tour.Serial === ID); // find tourIndex

  if (!Number.isInteger(ID) || index === -1) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid ID or Tour Not Found' });
  }

  tours[index] = {
    ...tours[index],
    ...req.body,
  };
  //save to file
  fs.writeFile('./dev-data/data/csvjson.json', JSON.stringify(tours), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'Internal Server Error' });
    }
    console.log('Successfully updated the Tour ✅');
    res.status(200).json({ status: 'success', data: tours[index] });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
