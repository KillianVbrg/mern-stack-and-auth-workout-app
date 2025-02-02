const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  if(!authorization){
    return res.status(401).json({error: "Authorization token required"});
  };

  // The authorization string looks like this: "Bearer knoizfzofjdl.ihfhiuzehfnzefzf.lhuinfzfnfzef"
  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // It returns the payload of the token (the _id)

    req.user = await User.findOne({ _id }).select("_id"); // It returns just the _id thanks to _id. The req obkect now have a user property that we can use in other files like the workoutsController.js file

    next();
  } catch (error) {
    res.status(401).json({error: "Request is not authorized"});
  }
};

module.exports = requireAuth;