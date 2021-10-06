const db = require('../db');

// F: Wie viele Einträge gibt es bei cars und womit beginnt die Sequenz cars_id_seq?
// Was wird also passieren, wenn du neue Autos mit INSERT in die Tabelle einfügst,
// ohne eine id zu vergeben?
// A: Da bereits 9 Datensätze durch das SQL-File eingefügt werden sind die Startwerte nicht korrekt
// und müssen angepasst werden: siehe SQL-File

// Zusätzlich ist ein eigener User "dominikpalatin" mit beschränkten Rechten anzulegen.
// Der User muss CRUD-Rechte auf die Tabelle "cars" haben und SELECT/INSERT auf der Tabelle "owner".

const getCars = async () => {
  const { rows } = await db.query(
    'SELECT cars.id, title, image, status, price, miles, year_of_make, description, first_name, last_name FROM cars JOIN owner ON cars.owner = owner.id',
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
      [car.owner.firstName, car.owner.lastName],
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
      'DELETE FROM cars WHERE id = $1 RETURNING id',
      [id],
    );
    return {
      code: 200,
      data: `Deleted: (${rows[0].id})`,
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
