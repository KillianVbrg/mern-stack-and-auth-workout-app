const Workout = require("../models/workoutModel");
const { ObjectId } = require("mongodb");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({user_id}).sort({createdAt: -1}) // We sort to have the most recent first. The user_id can now be passed once we protected our API routes so a user can see only the workouts HE or SHE added, not the other ones
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const id = req.params.id;
  
  if(ObjectId.isValid(id)){
    const workout = await Workout.findById(id);

    if(workout == null ){
      res.status(500).json({ error: "Unvalid ID" });
    } else {
      res.status(200).json(workout);
    }
  } else {
    res.status(500).json({ error: "Unvalid ID length" });
  }
};

const createWorkout = async (req, res) => {
  const {title, repetitions, load} = req.body;

  // We are checking if all the fields are filled
  let emptyFields = [];
  if(!title){
    emptyFields.push("title")
  };
  if(!repetitions){
    emptyFields.push("repetitions")
  };
  if(!load){
    emptyFields.push("load")
  };
  // If not, we respond with an error
  if(emptyFields.length > 0){
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
  }


  try {
    const user_id = req.user._id; // We can now retrieve the id of the user logged in since we attached it to req in the requireAuth.js middleware file

    const workout = await Workout.create({title, repetitions, load, user_id});
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const deleteWorkout = async (req, res) => {
  const id = req.params.id;

  if(ObjectId.isValid(id)){
    const workout = await Workout.findByIdAndDelete(id);

    if(workout == null ){
      res.status(500).json({ error: "Unvalid ID" });
    } else {
      res.status(200).json(workout);
    }
  } else {
    res.status(500).json({ error: "Unvalid ID length" });
  };
};

const updateWorkout = async (req, res) => {
  const id = req.params.id;

  if(ObjectId.isValid(id)){
    const workout = await Workout.findByIdAndUpdate(id, {...req.body});

    if(workout == null ){
      res.status(500).json({ error: "Unvalid ID" });
    } else {
      res.status(200).json(workout);
    }
  } else {
    res.status(500).json({ error: "Unvalid ID length" });
  };
};


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
}