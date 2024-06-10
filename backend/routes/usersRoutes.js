const express = require("express");
const router = express.Router();

// Can do it like this (decompose) or like in the workoutsRoutes.js file
const { loginUser, signupUser } = require("../controllers/usersController");

// Login route
router.post("/login", loginUser);
// Signup route
router.post("/signup", signupUser);


module.exports = router;