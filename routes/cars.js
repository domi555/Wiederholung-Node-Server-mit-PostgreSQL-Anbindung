const express = require('express');
const {
  getController,
  patchController,
//   deleteController,
//   postController,
} = require('../controllers/cars');

const router = express.Router();

router.get('/cars', getController);
router.patch('/cars/:id', patchController);
// router.delete('/cars/:id', deleteController);
// router.post('/cars', postController);

module.exports = router;
