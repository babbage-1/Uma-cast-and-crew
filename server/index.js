const express = require('express');
const cors = require ('cors');
const app = express();
const path = require('path');
const db = require('../database/PGindex');
const port = process.env.PORT || 2002;
app.use(cors());

app.use('/', express.static('client/dist'));
app.use('/:id', express.static('client/dist'));
app.use(cors());
app.use(express.json());

app.get('/actors/:id', (req, res) => {
  let movieId = [req.params.id];
  console.log(movieId);
  db.getActorById(movieId, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(`actors GET error=${err}`);
    }
    res.send(results.rows);
  });
});

app.post('/actors/add', (req, res) => {
  const {id, name, title, role, photo, bio, filmography} = req.body;
  console.log(id, name, title, role, photo, bio, filmography);
  db.createActor(id, name, title, role, photo, bio, filmography, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(`actors POST error=${err}`);
    }
    res.send(`User added with ID: ${id}`);
  });
});

app.put('/actors/:id', (req, res) => {
  const {name, title, role, photo, bio, filmography} = req.body;
  let id = [req.params.id];
  console.log(req.params.id);
  console.log('PUT', name, title, role, photo, bio, filmography, id);
  db.updateActor(name, title, role, photo, bio, filmography, id, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(`actors PUT error=${err}`);
    }
    res.send(`User updated for ID: ${id}`);
  });
});



// app.get('/actors/:id', (req, res) => {
//   let movieId = req.params.id;
//   console.log(movieId);
//   dbIndex.getActors(movieId, (err, results) => {
//     if (err) {
//       res.sendStatus(500);
//       console.log(`actors GET error=${err}`);
//     }
//     res.send(results);
//   });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

/*
MONGO CONNECTION AND GET REQUESTS
const mongoose = require('mongoose');
const dbIndex = require('../database/mongo/index.js');

// let database = 'fandangit';
// mongoose.connect(`mongodb://localhost/${database}`, { useNewUrlParser: true });




// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log(`connected to ${database}!`);
// });

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



*/





//EXTRA
// console.log(JSON.stringify(req.query)); // = {"movieId":"1"}


// app.get('/', function(req, res) {
//   const reactPath = path.join(__dirname, '/../client/dist/index.html');
//   res.sendFile(reactPath);
// });

// app.get('/:id', function(req, res) {
//   const reactPath = path.join(__dirname, '/../client/dist/index.html');
//   res.sendFile(reactPath);
// });







