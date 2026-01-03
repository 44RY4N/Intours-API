const Tours = require(`${__dirname}/../models/tourModel.js`);
///////////////////////////////////////////////////////////////////
// GETTING TOURS

exports.getTours = async (req, res) => {
  try {
    // Clone query object
    let queryObj = { ...req.query };

    // Fields to exclude from filtering
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 🔍 Search logic (partial match)
    if (req.query.search) {
      queryObj.$or = [
        { State: { $regex: req.query.search, $options: 'i' } },
        { City: { $regex: req.query.search, $options: 'i' } },
        { Name: { $regex: req.query.search, $options: 'i' } },
      ];
    }
    // console.log(await Tours.find());
    let query = Tours.find(queryObj);

    //Sorting
    if (req.query.sort) {
      const sortQ = req.query.sort.split(',').join(' ');
      query = query.sort(sortQ);
    }

    //feild limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    // console.log('queryObj', queryObj);

    // Execute query
    const tours = await query;
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

// const getPaginatedTours = (req, tours) => {
//   let limit = Number(req.query.limit);
//   let pageNum = Number(req.query.page) || 1;
//   const startIndex = (pageNum - 1) * limit;
//   const endIndex = startIndex + limit;
//   return tours.data.slice(startIndex, endIndex);
// };
