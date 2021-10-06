const express = require('express');
const {
  getController,
  patchController,
  postController,
  deleteController,
} = require('../controllers/cars');

const router = express.Router();

router.get('/cars', getController);
router.patch('/cars/:id', patchController);
router.post('/cars', postController);
router.delete('/cars/:id', deleteController);

module.exports = router;
