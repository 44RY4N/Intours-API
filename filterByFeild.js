const filterByRegion = (tours, region) => {
  console.log('filtering by region 🧭');
  const filteredTours = tours.filter((tour) => tour.Zone === region);

  // extract unique states
  const states = [...new Set(filteredTours.map((tour) => tour.State))];

  return {
    states,
    data: filteredTours,
  };
};

const filterByState = (tours, state) => {
  console.log('filtering by State ⛰🌊🏙');
  return tours.filter((tour) => tour.State === state);
};

const filterByRating = (tours, order) => {
  console.log('filtering by rating ⭐🌟🌟🌟⭐');
  if (order === 'a') {
    return tours.sort(
      (a, b) => a['Google review rating'] - b['Google review rating'],
    );
  }
  if (order === 'd') {
    return tours.sort(
      (a, b) => b['Google review rating'] - a['Google review rating'],
    );
  }
  return tours;
};

const filterByName = (tours, name) => {
  console.log('filtering by name');
  name = name.toLowerCase();
  const newTours = tours.filter((tour) =>
    tour.Name.toLowerCase().includes(name),
  );
  return newTours;
};

module.exports = {
  filterByRegion,
  filterByState,
  filterByRating,
  filterByName,
};
