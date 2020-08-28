const express = require("express");
const mongoose = require("mongoose");
const Movies = require("./model/Movies");
require("dotenv/config");
const { database } = require("./database");
const app = express();

// Database Connect
mongoose.connect(
  process.env.DATABASE_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB.");
  }
);
// Add Movies to the server
app.get("/", async (req, res) => {
  console.log("On Server");
  database.forEach(async (movie) => {
    await pushMyData(req, res, movie);
  });
  res.status(200).json(database);
});
// Get Movies List
app.get("/getMovies", async (req, res) => {
  console.log("Getting Movies");
  Movies.find()
    .then((movies) => {
      logThis(movies);
      res.status(200).json(movies);
    })
    .catch((e) => {
      console.error(e);
    });
});
// Delete Movies
app.get("/deleteMovies", async (req, res) => {
  console.log("Getting Movies");
  Movies.find()
    .then((movies) => {
      logThis(`fetched ${movies.length} movies.`);
      movies.forEach((movie) => {
        Movies.findByIdAndDelete(`${movie._id}`)
          .then(() => {
            logThis("Deleted !");
          })
          .catch((e) => {
            console.error(e);
          });
        res.status(200).send("completed");
      });
    })
    .catch((e) => {
      console.error(e);
    });
});
// Search Movies
app.get("/searchMovies/:query", async (req, res) => {
  let searchQuery = await req.params.query.toString();
  console.log("Getting Movies");
  Movies.find({ title: await searchQuery })
    .limit(2)
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((e) => {
      console.error(e);
    });
});

//PORT listening
const port = process.env.PORT || 5000;
app.listen(port, logThis("Server Is Up!!"));
function logThis(message) {
  console.log(message);
}

async function pushMyData(req, res, movie) {
  let individualMovieData = new Movies(movie);
  try {
    // //save a user
    individualMovieData
      .save()
      .then((addedData) => {
        console.log("Added!");
      })
      .catch((e) => {
        console.error(e);
      });
  } catch (e) {
    res.status(400).send(e);
  }
}
