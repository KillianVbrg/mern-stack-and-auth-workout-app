const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" }); // Passing the id in the payload, giving a secret pass phrase to encode the JWT and give the expiration date. Let empty for infinite login. 60 = 60s and "60" = 60ms
};


// Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });  // We pas the token in the response
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};


// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};


module.exports = {
  loginUser,
  signupUser,
};