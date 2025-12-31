const fs = require('fs');
const filter = require(`${__dirname}/../filter/filter.js`);
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/csvjson.json`),
);

///////////////////////////////////////////////////////////////////
// GETTING TOURS

exports.getTours = (req, res) => {
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
};
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// GET TOUR BY ID

exports.getTourById = (req, res) => {
  const ID = req.params.id * 1;
  const tour = tours.find((el) => el.Serial === ID);
  if (!tour || !Number.isInteger(ID)) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid ID Recieved/Tour not Found' });
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
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// DELETE A TOUR

exports.deleteTour = (req, res) => {
  const ID = Number(req.params.id);
  const index = tours.findIndex((tour) => tour.Serial === ID); // find tourIndex

  if (!Number.isInteger(ID) || index === -1) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid ID or Tour Not Found' });
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
