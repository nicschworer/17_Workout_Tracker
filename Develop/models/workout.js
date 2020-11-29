const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now 
    },
    exercises: [
        {
        type: {
            type: String,
            required: true },
        name: {
            type: String,
            required: true },
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;