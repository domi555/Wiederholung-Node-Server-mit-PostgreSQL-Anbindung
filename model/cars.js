const db = require('../db');

const getCars = async () => {
  const { rows } = await db.query(
    'SELECT * FROM cars JOIN owner ON cars.owner = owner.id',
  );
  return {
    code: 200,
    data: rows,
  };
};

const patchCar = async (id, status) => {
  const check = await db.query('SELECT 1 FROM cars WHERE id = $1', [id]);
  if (check.rows.length !== 0) {
    const { rows } = await db.query(
      `UPDATE cars SET status = $1 WHERE id = ${id} RETURNING id, status`,
      [status],
    );
    return {
      code: 200,
      data: `Updated id: (${rows[0].id}) to status: (${rows[0].status})`,
    };
  }
  return {
    code: 404,
    data: `Not found: (${id})`,
  };
};

const postCar = async (car) => {
  // START WITH 10, sonst würde er versuchen "id" mit dem Wert 1 zu beginnen

  const check = await db.query(
    'SELECT id FROM owner WHERE first_name = $1 AND last_name = $2',
    [car.owner.firstName, car.owner.lastName],
  );

  let ownerId;
  if (check.rows.length !== 0) {
    ownerId = check.rows[0].id;
  } else {
    const owner = await db.query(
      'INSERT INTO owner(first_name, last_name) VALUES ($1, $2) RETURNING id',
      [car.owner.first, car.owner.last],
    );
    ownerId = owner.rows[0].id;
  }

  const { rows } = await db.query(
    'INSERT INTO cars(title, image, status, price, miles, year_of_make, description, owner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
    [
      car.title,
      car.image,
      car.status,
      car.price,
      car.miles,
      car.yearOfMake,
      car.description,
      ownerId,
    ],
  );

  return {
    code: 200,
    data: rows[0].id,
  };
};

const deleteCar = async (id) => {
  const check = await db.query('SELECT 1 FROM cars WHERE id = $1', [id]);
  if (check.rows.length !== 0) {
    const { rows } = await db.query(
      'DELETE FROM cars WHERE id = $1 RETURNING *',
      [id],
    );
    return {
      code: 200,
      data: `Deleted: (${rows[0]})`,
    };
  }
  return {
    code: 404,
    data: `Not found: (${id})`,
  };
};

module.exports = {
  getCars,
  patchCar,
  postCar,
  deleteCar,
};
