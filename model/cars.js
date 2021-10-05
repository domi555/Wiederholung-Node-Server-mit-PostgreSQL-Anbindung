const db = require('../db');

const getCars = async () => {
  const { rows } = await db.query('SELECT * FROM cars');
  return {
    code: 200,
    data: rows,
  };
};

const patchCar = async (id, title) => {
  const { rows } = await db.query(
    `UPDATE cars SET title = ${title} WHERE id = ${id}`,
  );
  return {
    code: 200,
    data: rows,
  };
};

module.exports = { getCars, patchCar };
