const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const mongojs = require("mongojs");
const Workout = require("./models/workout");



const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workouts_db";
const collections = ["workouts"];

const db = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { useNewUrlParser: true });

// db.on("error", error => {
//   console.log("Database Error:", error);
// });

// html routes
app.get("/", (req, res) => {
  res.send(index.html);
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"))
});

// api routes

app.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    })
})

app.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log(body);
  Workout.update({_id: mongojs.ObjectId(params.id)}, {$push: {exercise: body}})
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.status(400).json(err);
  })
  console.log("im there");
});

app.get("/api/workouts", (req, res) => {
  Workout.find({})
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

app.delete("/api/workouts", ({ body }, res) => {

})




















app.listen(3000, () => {
  console.log("app is listening on port 3000");
})
