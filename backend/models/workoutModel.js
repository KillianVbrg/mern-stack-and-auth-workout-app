const mongoose = require("mongoose"); // It is mongoose which allows to create schemas, MongoDB alone is schemaless

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  repetitions: {
    type: Number,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
  user_id: { // We add now the user_id to each workout to each user can only see and modify their own worjouts
    type: String,
    required: true,
  }
}, { timestamps: true }) // Automatically create created_date, updated_date, ... properties

// Create the model based on the schema
// The model is the thing that surrounds the schema and gives methods (like Workout.find()) to communicate with the db
// The name given should be the singular of the collection name in MongoDB
module.exports = mongoose.model("Workout", workoutSchema);