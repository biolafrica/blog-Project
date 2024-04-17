const jwt = require("jsonwebtoken");
const User = require("../model/userModel");


const secret = process.env.jwtSignature; 



const protectRoute = async(req, res,next)=>{
  try{
    const token = req.cookies.auth;
    if(!token){
      return res.redirect("/admin");
    }

    jwt.verify(token, secret, async(err, decodedToken)=>{
      if(err){
        res.redirect("/admin");
      }else{
        return next(); 
      }

    })

  }catch(error){
    return res.redirect("/admin");
  }

}

const checkAdmin = (req, res, next)=>{
  const token = req.cookies.auth;
  if(!token){
    res.locals.admin = null;
    return next();
  }

  jwt.verify(token, secret, async(err, decodedToken)=>{
    if(err){
      res.locals.admin = null;
      return next()
    }else{
      try {
        let admin = await User.findById(decodedToken.id);
        res.locals.admin = admin;
        return next();
        
      } catch (error) {
        res.locals.admin = null;
        return next()
        
      }
    
    }

  })


};


module.exports = {
  checkAdmin,
  protectRoute
};
