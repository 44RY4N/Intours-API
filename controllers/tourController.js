const Tours = require(`${__dirname}/../models/tourModel.js`);
///////////////////////////////////////////////////////////////////
// GETTING TOURS

exports.getTours = async (req, res) => {
  // Formatted Structure for Ease of Access at FrontEnd
  let tours;
  try {
    tours = {
      meta: {
        states: [],
        region: null,
      },
      data: await Tours.find(),
    };
  } catch (err) {
    return res.status(500).json({ status: 'fail', message: err });
  }

  // else send back all tours
  res.status(200).json({
    status: 'success',
    result: tours.data.length,
    meta: tours.meta,
    filter: 'false',
    data: tours.data,
  });
};
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// GET TOUR BY ID

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tours.findById(req.params.id);
  } catch (err) {
    return res.status(500).json({ status: 'fail', message: err });
  }
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Tour not Found' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// ADD A TOUR

exports.postTour = async (req, res) => {
  let tour;
  try {
    tour = await Tours.create(req.body);
  } catch (err) {
    return res.status(500).json({ status: 'fail', message: err });
  }
  res.status(201).json({ status: 'success', data: { tour } });
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// UPDATE A TOUR

exports.patchTour = async (req, res) => {
  let updatedTour;
  try {
    updatedTour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    return res.status(500).json({ status: 'fail', message: err });
  }
  res.status(200).json({ status: 'success', data: updatedTour });
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// DELETE A TOUR

exports.deleteTour = async (req, res) => {
  try {
    await Tours.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(500).json({ status: 'fail', message: err });
  }
  res.status(204).json({ status: 'success', data: null });
};

exports.checkBody = (req, res, next) => {
  console.log(`checked body: ${req.body}`);
  if (!req.body) {
    res
      .status(400)
      .json({ status: 'error', message: 'Bad Request', data: req.body });
  }

  next();
};

// const getPaginatedTours = (req, tours) => {
//   let limit = Number(req.query.limit);
//   let pageNum = Number(req.query.page) || 1;
//   const startIndex = (pageNum - 1) * limit;
//   const endIndex = startIndex + limit;
//   return tours.data.slice(startIndex, endIndex);
// };
