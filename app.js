require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute");
const Post = require("./model/postModel");
const cookieParser = require('cookie-parser');
const {checkAdmin} = require("./Middleware/auth");


//setup express app
const app = express();

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

// connect to database
const URI = process.env.MongoDB_URI;
mongoose.connect(URI)
.then(result => app.listen(3000))
.catch(error => console.log(error));


//setup view engine
app.set("view engine", "ejs");


app.get("*", checkAdmin);
app.post("*", checkAdmin);
app.use("/admin", adminRouter);
app.use(userRouter);

app.use((req, res)=>{
  const locals ={
    title : "Error Page",
    description : "Eatup Food Services Limited Official Blog"
  };
  res.status(404).render("error", {locals});

})






