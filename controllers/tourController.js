const Tours = require(`${__dirname}/../models/tourModel.js`);
const APIFeatures = require(`${__dirname}/../utils/apiFeatures.js`);
/////////////////////////////////////////////////////////////////
exports.getTours = async (req, res) => {
  try {
    // Execute query
    const features = new APIFeatures(Tours.find(), req.query)
      .search()
      .filter()
      .sort()
      .fieldLimit()
      .paginate();
    const tours = await features.queryObj;
    // console.log('tours', tours);
    // Send response
    res.status(200).json({
      status: 'success',
      result: tours.length,
      meta: [],
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
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

// Aggregation pipeline for stats

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tours.aggregate([
      { $match: { zone: 'Eastern' } },
      { $group: { _id: '$state', avgRating: { $avg: '$googleReviewRating' } } },
      { $sort: { avgRating: -1 } },
    ]);
    res.status(200).json({
      status: 'success',
      result: stats,
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};
