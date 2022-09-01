const express = require("express");
const fromrouter = new express.Router();
const sss = require("../models/from");
fromrouter.use(express.urlencoded({ extended: false }));
const jwt = require("jsonwebtoken")
//const bcrypt=require("bcrypt")

fromrouter.get("/st", (req, res) => {
  res.render("index");
});

fromrouter.post("/st", async (req, res) => {
  try {
      // const gh = await new sss(req.body);// statics
      //define models
const ssch= new sss({
    firstname:req.body.firstname,
    pass:req.body.pass
})

const token=await ssch.genertoken()
console.log(token);

   //cookie part added
   res.cookie("jwt",token,{
    expires: new Date(Date.now()+300000),
   httpOnly:true   // this is for not access javascript.
   })


    const result = await ssch.save();

    console.log(result);
    res.render("index");
  } catch (error) {
    console.log(error);
  }
});

module.exports = fromrouter;





