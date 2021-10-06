const asyncHandler = require('express-async-handler');
const {
  getCars,
  patchCar,
  postCar,
  deleteCar,
} = require('../model/cars');

const getController = asyncHandler(async (req, res) => {
  const result = await getCars();
  return res.status(result.code).json(result.data);
});

const patchController = asyncHandler(async (req, res) => {
  const result = await patchCar(req.params.id, req.body.status);
  return res.status(result.code).json(result.data);
});

const postController = asyncHandler(async (req, res) => {
  const result = await postCar(req.body);
  return res.status(result.code).json(result.data);
});

const deleteController = asyncHandler(async (req, res) => {
  const result = await deleteCar(req.params.id);
  return res.status(result.code).json(result.data);
});

module.exports = {
  getController,
  patchController,
  postController,
  deleteController,
};
