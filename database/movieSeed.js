const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
const faker = require('faker');
const actorGen = require('./actorSeed');

var movieId = 1;

//creates array of actors for movie table
const generateActors = function() {
  var randInt = (Math.floor(Math.random() * (8 - 4)) + 4);
  var arr = [];
  for (let i = 0; i < randInt; i++) {
    arr.push((Math.floor(Math.random() * (1000 - 1)) + 1));
  }
  return arr;
};
//creates movie file
const movieGen = () => {
  console.time('timing seed movie Gen');
  writer.pipe(fs.createWriteStream('movieData.csv'));
  for (let i = 0; i < 10000000; i++) {
    writer.write({
      movieId: movieId++,
      actors: `{${generateActors()}}`
    });
  }
  writer.end();
  console.timeEnd('timing seed movie Gen');
};

//This function creates csv file for 10M movies for movies table
movieGen();
//This function creates csv file for 1,000 actors for actors table
actorGen.actorGen();
