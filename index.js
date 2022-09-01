require("dotenv").config();
const express = require("express");
const router = require("./router/app");
const path = require("path");
const bcrypt = require("bcryptjs");
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const auth=require("./midleware/auth")
const app = express();
const port = process.env.PORT || 3000;

require("./db/conn");

// database
const mongoose = require("mongoose");
// const db=require("./db/conn")
//const register=require("./models/register")
//
const multer = require("multer");
const handlebars = require("handlebars");
const hbs = require("hbs");

//const doc = require("./models/register");
const List = require("./models/register");
const sss = require("./models/from");
const fromrouter = require("./router/fromrouter");
const { log } = require("console");
const { loadavg } = require("os");
const cookieParser = require("cookie-parser");

const spath = path.join(__dirname, "./public");
const tempath = path.join(__dirname, "./templates/views");
const parpath = path.join(__dirname, "./templates/partials");

// handle routers
app.use(router);
app.use(fromrouter);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// set view engens
app.set("view engine", "hbs");
app.set("views", tempath);

// set partials
hbs.registerPartials(parpath);

app.get("/secret",auth, async(req, res) => {
try {
  req.user.tokens = req.user.tokens.filter((currentelement)=>{
   return currentelement.token !== req.token
  })
  res.clearCookie("jwt")
console.log("Logout successfully");
  // save to database
  await req.user.save()
  res.render("sec")
} catch (error) {
  console.log(error);
}
});

app.get("/log", (req, res) => {
  res.render("login");
});

app.post("/log", async (req, res) => {
  try {
    const fname = req.body.username;
    const passwordd = req.body.pass;
    const result = await sss.findOne({ firstname: fname });

    console.log(result);

    console.log(passwordd)
    //console.log(result.firstname)
    console.log(result.pass)

    const con = await bcrypt.compare(passwordd,result.pass)
    console.log(con);
        const token=await result.genertoken()  // sobsomi pass ar nicha likhte hobe
    console.log(token);
      // //  //cookie part added
      res.cookie("jwt",token,{
        expires: new Date(Date.now()+300000000),
       httpOnly:true   // this is for not access javascript.
       })

    if (con) {
      res.render("index");
    }
    
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});





 
