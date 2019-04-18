const express = require('express');
const cors = require ('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dbIndex = require('../database/index.js');
const port = process.env.PORT || 2002;


let database = 'fandangit';
mongoose.connect(`mongodb://localhost/${database}`, { useNewUrlParser: true });
app.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`connected to ${database}!`);
});

app.use('/', express.static('client/dist'));
app.use('/:id', express.static('client/dist'));
app.use(cors());
app.use(express.json());

app.get('/actors/:id', (req, res) => {
  // console.log(JSON.stringify(req.query)); // = {"movieId":"1"}
  let movieId = req.params.id;
  console.log(movieId);
  dbIndex.getActors(movieId, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(`actors GET error=${err}`);
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

// app.get('/', function(req, res) {
//   const reactPath = path.join(__dirname, '/../client/dist/index.html');
//   res.sendFile(reactPath);
// });

// app.get('/:id', function(req, res) {
//   const reactPath = path.join(__dirname, '/../client/dist/index.html');
//   res.sendFile(reactPath);
// });







//app.use('/*', express.static(__dirname + '/../client'));


// === THIS IS FOR TESTING GETTING DIFFERENT MOVIES BY NAME OR id === //
// app.use('/*/styles.css', express.static(__dirname + '/../client'));
// app.use('/*', express.static(__dirname + '/../client'));