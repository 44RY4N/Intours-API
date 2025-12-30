const {
  filterByRegion,
  filterByState,
  filterByRating,
  filterByName,
} = require('./filterByFeild.js');

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
    const regionResult = filterByRegion(result.data, query.region);
    result.data = regionResult.data;
    result.meta.states = regionResult.states;
    result.meta.region = query.region;
  }

  if (query.state) {
    result.data = filterByState(result.data, query.state);
  }

  if (query.name) {
    result.data = filterByName(result.data, query.name);
  }

  if (query.rating) {
    result.data = filterByRating(result.data, query.rating);
  }

  return result;
};

module.exports = filter;
