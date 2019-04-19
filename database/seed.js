const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
const faker = require('faker');

var movieId = 0;
var counter = 1;

var limit = (Math.floor(Math.random() * (6 - 3)) + 3);
const dataGen = () => {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 0; i < 1000000; i++) {
    movieId++;
    for (let j = 0; j < limit; j++) {
      writer.write({
        id: counter++,
        name: faker.name.findName(),
        title: faker.random.word(),
        movieId: movieId,
        role: faker.name.findName(),
        photo: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        filmography: `{ ${faker.random.word()}, ${faker.random.word()}, ${faker.random.word()} }`
      });
    }
  }
  writer.end();
  console.log('done');
};

dataGen();

// filmography: `[ ${faker.random.word()}, ${faker.random.word()}, ${faker.random.word()} ]`