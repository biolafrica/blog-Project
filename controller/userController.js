const Post = require("../model/postModel");
const jwt = require("jsonwebtoken");
const Subscribe = require("../model/subscribeModel");



const getHome = async(req, res)=>{
  const locals ={
    title : "The Eatup Blog",
    description : "Eatup Food Services Limited Official Blog"
  };

  const perPage = 6;
  const page = parseInt(req.query.page) || 1;


  try {
    const post = await Post.find().sort({createdAt: -1})
    .skip((perPage*page)-perPage)
    .limit(perPage)
    .exec()

    const count = await Post.countDocuments();

  
    const hasNextPage = (perPage * page) < count;
    const hasPrevPage = page > 1 ;
  


    res.cookie("auth", "", {maxAge : 1});
    res.render("index", {
      post,
      locals,
      current : page,
      nextPage : hasNextPage? page + 1 : null,
      prevPage : hasPrevPage ? page -1 : null,
      currentRoute :"/"

    });
   
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error")
    
  }
 

}

const postSubscribe = async(req, res)=>{
  const {email} = req.body;
  try {
    const result = await Subscribe.create({email});
    res.status(201).json({id:result._id});
    
  } catch (error) {
    console.log(error)
    
  }

}

const postSearch = async(req, res)=>{
  const locals ={
    title : "Search Results - Eatup Blog",
    description : "Eatup Food Services Limited Official Blog"
  };


  const search = req.body.searchTearm;
  const data = await Post.find({
    $or : [
      {title : {$regex: new RegExp(search, "i")}},
      {body : {$regex: new RegExp(search, "i")}}
    ]

  })

  res.render("searchR", {
    data,
    search,
    locals

  })


}

const getAbout = (req, res)=>{
  const locals ={
    title : "About Eatup",
    description : "Eatup Food Services Limited Official Blog"
  };

  res.render("about", {locals});

}



const getBlog = async(req, res)=>{


  try {

    if(req.params.id === "favicon.ico"){
      return res.sendStatus(204);
    }

    const id = req.params.id;
    const post = await Post.findById(id);
    const data = await Post.find().sort({createdAt: -1});

    const locals ={
      title : `${post.title} | The Eatup Blog`,
      description : "Eatup Food Services Limited Official Blog"
    };

    res.render("blog", {post, data, locals});
    
  } catch (error) {
    const locals ={
      title : "Error Page",
      description : "Eatup Food Services Limited Official Blog"
    };
    res.status(404).render("error", {locals});   
  }

}


module.exports = {
  getHome,
  postSearch,
  getAbout,
  getBlog,
  postSubscribe

}