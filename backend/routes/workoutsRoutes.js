const express = require("express");
const router = express.Router();

const workoutsController = require("../controllers/workoutsController");

// We check if the user is logged in, if not, he can't access the workouts
const requireAuth = require("../middlewares/requireAuth");
// This ensure that the user in authenticated to create a workout, delete, see, ...
router.use(requireAuth); // The user is not authenticated, it will never go through the functions below


router.get("/", workoutsController.getWorkouts);
router.get("/:id", workoutsController.getWorkout);
router.post("/", workoutsController.createWorkout);
router.delete("/:id", workoutsController.deleteWorkout);
router.patch("/:id", workoutsController.updateWorkout);


module.exports = router;