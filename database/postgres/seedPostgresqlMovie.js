const { Pool} = require('pg');
const path = require('path');
const { config } = require('./config');
// const pool = new Pool(config);

const pool = new Pool({
  user: config.user,
  host:  config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

// const pool = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'SDC',
//   password: '',
//   port: 5432,
// });

const seedPostgresMovie = async () => {
  const client = await pool.connect();

  try {
    console.time('timing seed');
    // Transaction BEGIN!
    await client.query('BEGIN');
    console.log('creating movieinfo table!');
    await client.query(`
      CREATE TABLE IF NOT EXISTS MovieInfo(
        movieId NUMERIC NOT NULL,
        actorId NUMERIC NOT NULL
        );
    `);

    console.log('writing to database!');
    const copyPath = path.join(__dirname, '../../movieData.csv');
    const envPath = '/var/lib/pgsql92/movieData.csv'
    await client.query(`
      COPY MovieInfo FROM '${envPath}' WITH (FORMAT CSV, HEADER);
    `);

    console.log('adding auto serial index column named "id"!');
    await client.query(`
      ALTER TABLE movieinfo ADD COLUMN id SERIAL PRIMARY KEY;
    `);

    console.log('adding index to column named "movieid"!');
    await client.query(`
    CREATE INDEX movieidindex ON movieinfo (movieid);
    `);

    console.log('commiting!');
    await client.query('COMMIT');
    // Transaction END!
    console.timeEnd('timing seed');
  } catch (e) {
    await client.query('ROLLBACK');
    console.log('error!');
    throw e;
  } finally {
    console.log('releasing...');
    client.release();
  }
};

seedPostgresMovie().catch(e => console.error(e.stack));