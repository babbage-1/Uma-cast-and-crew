const { Pool} = require('pg');
const path = require('path');
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'SDC',
  password: '',
  port: 5432,
});

(async () => {
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
    const copyPath = path.join(__dirname, '../movieData.csv');
    await client.query(`
      COPY MovieInfo FROM '${copyPath}' WITH (FORMAT CSV, HEADER);
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
})().catch(e => console.error(e.stack));


