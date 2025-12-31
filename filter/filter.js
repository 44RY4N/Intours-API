const controller = require(`${__dirname}/../controllers/filterController.js`);

// This implements like a controller to maintain the MVC Architecture

const filter = (tours, query) => {
  // Formatted Structure for Ease of Access at FrontEnd
  let result = {
    meta: {
      states: [],
      region: null,
    },
    data: tours,
  };

  if (query.region) {
    const regionResult = controller.filterByRegion(result.data, query.region);
    result.data = regionResult.data;
    result.meta.states = regionResult.states;
    result.meta.region = query.region;
  }

  if (query.state) {
    result.data = controller.filterByState(result.data, query.state);
  }

  if (query.name) {
    result.data = controller.filterByName(result.data, query.name);
  }

  if (query.rating) {
    result.data = controller.filterByRating(result.data, query.rating);
  }

  return result;
};

module.exports = filter;
