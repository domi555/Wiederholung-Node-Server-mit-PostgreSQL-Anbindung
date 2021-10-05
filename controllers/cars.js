const asyncHandler = require('express-async-handler');
const { getCars, patchCar } = require('../model/cars');

const getController = asyncHandler(async (req, res) => {
  const result = await getCars();
  return res.status(result.code).json(result.data);
});

const patchController = asyncHandler(async (req, res) => {
  const result = await patchCar(req.params.id, req.body.title);
  return res.status(result.code).json(result.data);
});

// const deleteController = asyncHandler(async (req, res) => {
//   const result = await getCars();
//   return res.status(result.code).json(result.data);
// });

// const postController = asyncHandler(async (req, res) => {
//   const result = await getCars();
//   return res.status(result.code).json(result.data);
// });

module.exports = { getController, patchController };
