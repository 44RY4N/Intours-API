const express = require('express');
const controller = require(`${__dirname}/../controllers/tourController.js`);
const router = express.Router();

router.route('/').get(controller.getTours).post(controller.postTour);

//get tour by id //patching a tour by ID //delte a tour
router
  .route('/:id')
  .get(controller.getTourById)
  .patch(controller.patchTour)
  .delete(controller.deleteTour);

module.exports = router;
