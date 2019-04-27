const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

//creates movie csv file
const idGen = () => {
  console.time('timing seed');
  writer.pipe(fs.createWriteStream('ArtilleryId.csv'));
  for (let i = 0; i < 10000; i++) {
    writer.write({
      id: (Math.floor(Math.random() * (10000000 - 1)) + 1)
    });
  }
  writer.end();
  console.timeEnd('timing seed');
};

//This function creates csv file for 10M ids
idGen();

// //creates array of actors for movie table
// const generateActors = function() {
//   var randInt = (Math.floor(Math.random() * (8 - 4)) + 4);
//   var arr = [];
//   for (let i = 0; i < randInt; i++) {
//     arr.push((Math.floor(Math.random() * (1000 - 1)) + 1));
//   }
//   return arr;
// };