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

module.exports = {
  getActorById,
  createActor
};