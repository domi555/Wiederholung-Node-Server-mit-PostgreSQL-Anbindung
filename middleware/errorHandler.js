/* eslint no-unused-vars: off */

const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(`Server Error => ${err}`.red);
    res.status(500).send('Server Error');
  } else next();
};

const notFound = (req, res) => {
  console.log(`Not Found ${req.originalUrl}`.blue);
  res.status(404).send('Not Found');
};

module.exports = { errorHandler, notFound };
