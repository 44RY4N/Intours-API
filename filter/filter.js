const controller = require(`${__dirname}/../controllers/filterController.js`);

// This module is implemented like a controller to maintain MVC Architecture

const filter = (tours, query) => {
  if (query.region) {
    const regionResult = controller.filterByRegion(tours.data, query.region);
    tours.data = regionResult.data;
    tours.meta.states = regionResult.states;
    tours.meta.region = query.region;
  }

  if (query.state) {
    tours.data = controller.filterByState(tours.data, query.state);
  }

  if (query.name) {
    tours.data = controller.filterByName(tours.data, query.name);
  }

  if (query.rating) {
    tours.data = controller.filterByRating(tours.data, query.rating);
  }

  return tours;
};

module.exports = filter;
