const express = require('express');
const controller = require(`${__dirname}/../controllers/tourController.js`);
const router = express.Router();

// router.param('id', controller.checkId);

// router
//   .route('/delhi-tours')
//   .get(controller.aliasDelhiTours, controller.getTours);
router.route('/tour-stats').get(controller.getTourStats);

router
  .route('/')
  .get(controller.getTours)
  .post(controller.checkBody, controller.postTour);

//get tour by id //patching a tour by ID //delte a tour
router
  .route('/:id')
  .get(controller.getTourById)
  .patch(controller.patchTour)
  .delete(controller.deleteTour);

module.exports = router;
