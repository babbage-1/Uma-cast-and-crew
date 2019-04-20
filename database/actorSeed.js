const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
const faker = require('faker');

var counter = 1;

//creates actor table
const actorGen = () => {
  console.time('timing seed actor Gen');
  writer.pipe(fs.createWriteStream('actorData.csv'));
  for (let i = 0; i < 1000; i++) {
    writer.write({
      id: counter++,
      name: faker.name.findName(),
      title: faker.random.word(),
      role: faker.name.findName(),
      photo: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
      filmography: `{ ${faker.random.word()}, ${faker.random.word()}, ${faker.random.word()} }`
    });
  }

  writer.end();
  console.timeEnd('timing seed actor Gen');
};

module.exports.actorGen = actorGen;

