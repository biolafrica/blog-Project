const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title : {
    type : String,
    required : [true,"Kindly add a title"]
  },
  body : {
    type : String,
    required : [true,"Kindly add a body"]
  },
  imageUrl : {
    type : String,
    required : [true,"Kindly add an image"]
  },
  createdAt :{
    type : Date,
    default : Date.now
  },
  UpdatedAt :{
    type : Date,
    default : Date.now
  }

}, )

module.exports = mongoose.model("Post", postSchema);