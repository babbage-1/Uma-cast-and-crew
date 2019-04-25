// const mongoose = require('mongoose');
// // const pw = require('./credentials');
// // const dbURI = `mongodb+srv://bkwon94:${pw.pw}@cluster0-2ific.mongodb.net/fec`
// // connect to database in mongo atlas

// mongoose.connect('mongodb://localhost/fandangit', { useNewUrlParser: true });
// const db = mongoose.connection;

// let actorSchema = mongoose.Schema({
//   id: Number,
//   name: String,
//   title: String,
//   movieId: Number,
//   role: String,
//   photo: String,
//   bio: String,
//   filmography: [{title: String, cast: Array}],
// });

// let Actor = mongoose.model('actor', actorSchema);

// let getActors = (movieId, callback) => {
//   Actor.find({'movieId': movieId}, ((err, results) => {
//     if (err) {
//       console.log(`find actors error=${err}`);
//       callback(err);
//     } else {
//       callback(null, results);
//     }
//   }));
// };

// module.exports = { getActors };

