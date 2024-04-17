const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { error } = require("console");


const userSchema = new mongoose.Schema({
  username : {
    required : [true,"please enter your username"],
    type : String,
    unique : true,
    lowercase : true
  },

  password : {
    required : [true, "please enter your password"],
    type : String,
    minLength : [6, 'minimum of six password required']

  }
})

//Mongoose Hook
userSchema.pre("save", async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// compare login
userSchema.statics.login = async function(username,password){
  try {
    const user = await this.findOne({username});
    if(!user){
      throw new Error("Incorrect username")
    }
    const auth = await bcrypt.compare(password, user.password)
    if(!auth){
      throw new Error("Incorrect password")
    }

    return user;

    
  } catch (error) {
    throw error
    
  }
 
}


module.exports = mongoose.model('User', userSchema);