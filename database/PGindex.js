const { Pool} = require('pg');

// const path = require('path');
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'SDC',
  password: '',
  port: 5432,
});

//Postres query SELECT * from ActorInfo INNER JOIN MovieInfo ON movieinfo.ACTORID=actorInfo.ID WHERE movieinfo.movieid=movieid;

const getActorById = (id, callback) => {
  pool.query(`SELECT * from ActorInfo INNER JOIN MovieInfo ON movieinfo.ACTORID=actorInfo.ID WHERE movieinfo.movieid=${id}`, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const createActor = async(name, title, role, photo, bio, filmography, movieId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log('inside function');
    const firstQuery = await client.query('INSERT INTO actorInfo (name, title, role, photo, bio, filmography) VALUES ($1, $2, $3, $4, $5, $6)', [name, title, role, photo, bio, filmography]);
    console.log('1st query executed');
    const secondQuery = await client.query('SELECT id from actorInfo WHERE name=$1 AND title=$2', [name, title]);
    console.log('2nd query executed');
    console.log(secondQuery.rows[0]);
    const data = secondQuery.rows[0];
    const thirdQuery = await client.query('INSERT INTO movieInfo(movieId, actorid) VALUES($1,$2)', [movieId, data.id]);
    console.log(thirdQuery);
    return thirdQuery.rowCount;
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

const updateActor = (name, title, role, photo, bio, filmography, id, callback) => {
  pool.query('UPDATE actorInfo SET name= $1, title=$2, role=$3, photo=$4, bio=$5, filmography=$6 WHERE id=$7', [name, title, role, photo, bio, filmography, id], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const deleteActor = (id, callback) => {
  pool.query('DELETE FROM actorInfo WHERE id=$1', [id], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

// UPDATE users SET

module.exports = {
  getActorById,
  createActor,
  updateActor,
  deleteActor
};