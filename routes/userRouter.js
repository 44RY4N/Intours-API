const express = require('express');
const controller = require(`${__dirname}/../controllers/userController.js`);
const router = express.Router();

router.route('/').get(controller.getUsers).post(controller.postUser);

//get User by id //patching a User by ID //delte a User
router
  .route('/:id')
  .get(controller.getUserById)
  .patch(controller.patchUser)
  .delete(controller.deleteUser);

module.exports = router;
