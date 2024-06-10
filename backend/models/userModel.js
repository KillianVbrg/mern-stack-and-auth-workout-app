const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // bcrypt is generating a "salt" a the end of each paswords (ex. passwordpstvl3 and password3kxpf6), it means that 2 similar passwords won't have the same hash
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });


// Static singup method
userSchema.statics.signup = async function(email, password) { // Need the use a regular function, not an arrow or, or we won't be able to use this.findOne  

  const exists = await this.findOne({ email });

  if(exists){ // If it exist, we sned back an error since we can't create 2 accounts with 1 email adress
    throw Error("Email already in use");
  } else {
    // Validation
    if(!email || !password){
      throw Error("All fields must be filled");
    }
    if(!validator.isEmail(email)){
      throw Error("Email is not valid");
    }
    if(!validator.isStrongPassword(password)){
      throw Error("Password not strong enough");
    }


    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
  }
};



// Static singup method
userSchema.statics.login = async function(email, password){
  if(!email || !password){
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if(!user){
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if(!match){
    throw Error("Incorrect password");
  }

  return user;
};


module.exports = mongoose.model("User", userSchema);