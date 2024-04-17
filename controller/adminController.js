const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const Post = require("../model/postModel");
const {protectRoute} = require("../Middleware/auth");


const maxAge = 3*24*60*60;
const secret = process.env.jwtSignature; 
const createToken = (id)=>{
 return jwt.sign({id}, secret, {expiresIn :maxAge})
}

const errorHandling = (err) =>{
  let errors = {username: "", password: ""};

  if(err.message === "Incorrect username" && err.message === "Incorrect username"){
    errors.username = "that email is not registered";
    errors.password = "that password is incorrrect"

  }

  if(err.message === "Incorrect username"){
    errors.username = "that email is not registered"
  }
  
  if(err.message === "Incorrect password"){
    errors.password = "that password is incorrrect"
  }

  if(err.code === 11000){
    errors.username = "that email is already registered"
    return errors;
  }

  //validation errors
  if(err.message.includes("user validation failed")){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message;
    });
  }

  return errors;

}



const adminRegGet = (req, res)=>{
  const locals ={
    title : "LogIn To Admin Dashboard",
    description : "Eatup Food Services Limited Official Blog"
  };

  res.render('adminIndex', {locals});

}

const adminLogout = (req, res)=>{
  res.cookie("auth", "", {maxAge : 1});
  res.redirect("/admin");

}

/*
const adminRegPost = async(req, res)=>{
  const {username, password} = req.body;

  try {
    const user = await User.create({username, password});
    const token = createToken(user._id);
    res.cookie('auth', token, {maxAge : maxAge*1000, httpOnly : true});
    res.status(201).json({id : user._id});


    
  } catch (error) {
    const errors = errorHandling(error)
    console.log(errors)
    
  }

} */

const adminHomeGet = async(req, res)=>{

  const locals ={
    title : "Eatup Admin Homepage",
    description : "Eatup Food Services Limited Official Blog"
  };

  const token = req.cookies.auth;

  if(!token){
    return res.redirect("/admin");
  }

  jwt.verify(token, secret, async(err)=>{
    if(err){
      res.redirect("/admin");
    }

  });
  
  try {
    const post = await Post.find()
    res.render('adminHome', {post, locals});
    
  } catch (error) {
    console.log(error)
    
  }
  
}

const adminLogPost = async(req, res)=>{
  const {username, password} = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie('auth', token, {maxAge: 1000 * maxAge, httpsOnly : true});
    res.status(201).json({id : user._id});
    
  } catch (error) {
    const err =  errorHandling(error);
    res.status(400).json({err});
    
  }  
}

const adminCreateGet = (req, res)=>{
  const locals ={
    title : "Add New Blog",
    description : "Eatup Food Services Limited Official Blog"
  };

  const token = req.cookies.auth;
  if(!token){
    return res.redirect("/admin");
  }

  jwt.verify(token, secret, async(err)=>{
    if(err){
      res.redirect("/admin");
    }

  });

  res.render('addPost', {locals});
}

const adminCreatePost = async(req, res)=>{
  
  try {
    const {body, title} = req.body;
    const result = await Post.create({body,title});
    res.status(201).json({id: result.id});
    
  } catch (error) {
    console.log(error)
    
  }

}

const adminEditGet = async(req, res)=>{

  const token = req.cookies.auth;

  if(!token){
    return res.redirect("/admin");
  }

  jwt.verify(token, secret, async(err)=>{
    if(err){
      res.redirect("/admin");
    }

  });

  const id = req.params.id;
  try {
    const data = await Post.findById(id);

    const locals ={
      title : `Edit ${data.title}`,
      description : "Eatup Food Services Limited Official Blog"
    };

    res.render("editPost", {data, locals});
    
  } catch (error) {
    const locals ={
      title : "Error Page",
      description : "Eatup Food Services Limited Official Blog"
    };
    res.status(404).render("error", {locals});
    
  }

  
}

const adminEditPut = async(req, res)=>{
  const id = req.params.id;
  
  try {
    const data = await Post.findByIdAndUpdate(id,{
      title : req.body.title,
      body : req.body.body,
      UpdatedAt : Date.now()
    })
    res.status(201).json({id: data._id});
    
  } catch (error) {
    const locals ={
      title : "Error Page",
      description : "Eatup Food Services Limited Official Blog"
    };
    res.status(404).render("error", {locals});
    
  }

  
}


const adminEditDelete = async(req, res)=>{
  const id = req.params.id;
  try {
    const data = await Post.findByIdAndDelete(id);
    const post = await Post.find();
    res.render("adminHome", {post})

  } catch (error) {
    const locals ={
      title : "Error Page",
      description : "Eatup Food Services Limited Official Blog"
    };
    res.status(404).render("error", {locals});
    
  }

  
}





module.exports = {
  adminRegGet,
  adminHomeGet,
  adminLogPost,
  adminCreateGet,
  adminCreatePost,
  adminEditGet,
  adminEditPut,
  adminEditDelete,
  adminLogout
}