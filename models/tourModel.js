const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    Serial: { type: Number },
    Zone: { type: String, required: [true, 'Zone is required'] },
    State: { type: String, required: [true, 'State is required'] },
    City: { type: String, required: [true, 'City is required'] },
    Name: {
      type: String,
      required: [true, 'Name is required'],
      unique: [true, 'Name Must be Unique'],
    },
    Type: { type: String },
    establishmentYear: { type: Number, alias: 'Establishment Year' },
    timeNeededToVisitInHrs: {
      type: Number,
      alias: 'time needed to visit in hrs',
    },
    googleReviewRating: { type: Number, alias: 'Google Review Rating' },
    entranceFeeInInr: { type: Number, alias: 'Entrance Fee in INR' },
    airportWith50kmRadius: { type: String, alias: 'Airport with 50km Radius' },
    weeklyOff: { type: String, alias: 'Weekly Off' },
    Significance: { type: String },
    dSLRAllowed: { type: String, alias: 'DSLR Allowed' },
    numberOfGoogleReviewInLakhs: {
      type: Number,
      alias: 'Number of google review in lakhs',
    },
    bestTimeToVisit: { type: String, alias: 'Best Time to visit' },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.establishmentYear;
        delete ret.timeNeededToVisitInHrs;
        delete ret.entranceFeeInInr;
        delete ret.airportWith50kmRadius;
        delete ret.weeklyOff;
        delete ret.dSLRAllowed;
        delete ret.numberOfGoogleReviewInLakhs;
        delete ret.bestTimeToVisit;
        delete ret.__v;
        delete ret.id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

const tours = mongoose.model('tours', tourSchema);

module.exports = tours;
