const express = require('express');
const {
  getController,
  patchController,
  postController,
  deleteController,
} = require('../controllers/cars');

const router = express.Router();

router.get('/', getController);
router.patch('/:id', patchController);
router.post('/', postController);
router.delete('/:id', deleteController);

module.exports = router;
