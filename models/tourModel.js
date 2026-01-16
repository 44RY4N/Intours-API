const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  serial: { type: Number },
  zone: { type: String, required: [true, 'Zone is required'] },
  state: { type: String, required: [true, 'State is required'] },
  city: { type: String, required: [true, 'City is required'] },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name Must be Unique'],
    trim: true,
  },
  type: { type: String },
  establishmentYear: { type: Number, alias: 'Establishment Year' },
  timeNeededToVisitInHrs: {
    type: Number,
    alias: 'time needed to visit in hrs',
  },
  googleReviewRating: { type: Number, alias: 'Google Review Rating' },
  entranceFeeInInr: { type: Number, alias: 'Entrance Fee in INR' },
  airportWith50kmRadius: { type: String, alias: 'Airport with 50km Radius' },
  weeklyOff: { type: String, alias: 'Weekly Off' },
  significance: { type: String },
  dslrAllowed: { type: String, alias: 'DSLR Allowed' },
  numberOfGoogleReviewInLakhs: {
    type: Number,
    alias: 'Number of google review in lakhs',
  },
  bestTimeToVisit: { type: String, alias: 'Best Time to visit' },
});

const tours = mongoose.model('tours', tourSchema);

module.exports = tours;
