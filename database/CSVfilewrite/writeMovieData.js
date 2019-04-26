const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const actorGen = require('./writeactorData');

let movieId = 0;
let counter = 1;

//creates movie csv file
const movieGen = () => {
  console.time('timing seed');
  writer.pipe(fs.createWriteStream('movieData.csv'));
  for (let i = 0; i < 10000000; i++) {
    movieId++;
    var randInt = (Math.floor(Math.random() * (6 - 3)) + 3);
    for (let j = 0; j < randInt; j++) {
      writer.write({
        id: counter++,
        movieId: movieId,
        actor: (Math.floor(Math.random() * (1000 - 1)) + 1)
      });
    }
  }
  writer.end();
  console.timeEnd('timing seed');
};

//This function creates csv file for 10M movies for movies table
movieGen();
//This function creates csv file for 1,000 actors for actors table
actorGen.actorGen();




// //creates array of actors for movie table
// const generateActors = function() {
//   var randInt = (Math.floor(Math.random() * (8 - 4)) + 4);
//   var arr = [];
//   for (let i = 0; i < randInt; i++) {
//     arr.push((Math.floor(Math.random() * (1000 - 1)) + 1));
//   }
//   return arr;
// };