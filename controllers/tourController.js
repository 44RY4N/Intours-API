const fs = require('fs');
const filter = require(`${__dirname}/../filter/filter.js`);
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/csvjson.json`),
);

///////////////////////////////////////////////////////////////////
// GETTING TOURS

exports.getTours = (req, res) => {
  // Formatted Structure for Ease of Access at FrontEnd
  let tours = {
    meta: {
      states: [],
      region: null,
    },
    data: toursData,
  };

  const isFilter = req.query.filter === 'true'; //convert to boolean
  //for sort requests
  if (isFilter) {
    tours = filter(tours, req.query);
  }
  // for page requests
  if (req.query.page) {
    tours.data = getPaginatedTours(req, tours);
  }

  // else send back all tours
  res.status(200).json({
    status: 'success',
    result: tours.data.length,
    meta: tours.meta,
    filter: isFilter,
    data: tours.data,
  });
};
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// GET TOUR BY ID

exports.getTourById = (req, res) => {
  const ID = req.params.id * 1;
  const tour = tours.find((el) => el.Serial === ID);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Tour not Found' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// ADD A TOUR

exports.postTour = (req, res) => {
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
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// UPDATE A TOUR

exports.patchTour = (req, res) => {
  const index = tours.findIndex((tour) => tour.Serial === ID); // find tourIndex

  if (index === -1) {
    return res.status(404).json({ status: 'fail', message: 'Tour Not Found' });
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
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// DELETE A TOUR

exports.deleteTour = (req, res) => {
  const ID = Number(req.params.id);
  const index = tours.findIndex((tour) => tour.Serial === ID); // find tourIndex

  if (index === -1) {
    return res.status(404).json({ status: 'fail', message: 'Tour Not Found' });
  }

  tours.splice(index, 1); // deleting from tours
  //save to file
  fs.writeFile('./dev-data/data/csvjson.json', JSON.stringify(tours), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'Internal Server Error' });
    }
    console.log('Successfully Deleted the Tour ✅');
    res.status(204).json({ status: 'success', data: null });
  });
};

exports.checkId = (req, res, next, val) => {
  if (!Number.isInteger(req.params.id)) {
    return res.status(500).json({
      status: 'fail',
      message: `Invalid ID Send an Integer Received NAN: ${val}`,
    });
  }
  next();
};

const getPaginatedTours = (req, tours) => {
  let limit = Number(req.query.limit);
  let pageNum = Number(req.query.page) || 1;
  const startIndex = (pageNum - 1) * limit;
  const endIndex = startIndex + limit;
  return tours.data.slice(startIndex, endIndex);
};
