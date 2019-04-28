const { Pool} = require('pg');
const path = require('path');
// const { config } = require('./config');
// const pool = new Pool(config);
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'SDC',
  password: '',
  port: 5432,
});

const seedPostgresActor = async () => {
  const client = await pool.connect();

  try {
    console.time('timing seed');
    // Transaction BEGIN!
    await client.query('BEGIN');
    console.log('creating actorinfo table!');
    await client.query(`
      CREATE TABLE IF NOT EXISTS ActorInfo(
        name VARCHAR(100),
        title VARCHAR(100),
        role VARCHAR(100),
        photo VARCHAR(100),
        bio VARCHAR(2000),
        filmography VARCHAR []
        );
    `);

    console.log('writing to database!');
    const copyPath = path.join(__dirname, '../../actorData.csv');
    await client.query(`
      COPY ActorInfo FROM '${copyPath}' WITH (FORMAT CSV, HEADER);
    `);

    console.log('adding auto serial index column named "id"!');
    await client.query(`
      ALTER TABLE actorinfo ADD COLUMN id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY;
    `);

    console.log('adding auto serial index on column named "role"!');
    await client.query(`
    CREATE INDEX roleindex ON actorinfo (role);
    `);

    console.log('adding auto serial index on column named "title"!');
    await client.query(`
    CREATE INDEX titleindex ON actorinfo (title);
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
    await client.release();
  }
};

seedPostgresActor().catch(e => console.error(e.stack));
