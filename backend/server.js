require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutsRoutes = require("./routes/workoutsRoutes");
const usersRoutes = require("./routes/usersRoutes");

// Express app
const app = express();


// Middleware to log all the requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})
// To retrieve the body of requests
app.use(express.json());


// Routes
app.use("/api/workouts", workoutsRoutes);
app.use("/api/users", usersRoutes);


// Connect to db
mongoose.set("strictQuery", true); // Else there is an error, is allows to store data only according to the models created
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {  // The port number is being pulled from the .env file
      console.log(`Connected to DB and listening on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });