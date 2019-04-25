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

const createActor = (id, name, title, role, photo, bio, filmography, callback) => {
  pool.query(`INSERT INTO actorInfo (id, name, title, role, photo, bio, filmography) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [id, name, title, role, photo, bio, filmography], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const updateActor = (name, title, role, photo, bio, filmography, id, callback) => {
  pool.query(`UPDATE actorInfo SET name= $1, title=$2, role=$3, photo=$4, bio=$5, filmography=$6 WHERE id=$7`, [name, title, role, photo, bio, filmography, id], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};


const deleteActor = (id, callback) => {
  pool.query(`DELETE FROM actorInfo WHERE id=$1`, [id], (err, results) => {
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