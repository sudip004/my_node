const express = require("express");
const fromrouter = new express.Router();
const sss = require("../models/from");
fromrouter.use(express.urlencoded({ extended: false }));
const jwt = require("jsonwebtoken")

fromrouter.get("/st", (req, res) => {
  res.render("index");
});

fromrouter.post("/st", async (req, res) => {
  try {
    // const gh = await new sss(req.body);
      
const ssch= new sss({
    firstname:req.body.firstname,
    pass:req.body.pass
})

    const token=await ssch.genertoken()
   // console.log(token);

    const result = await ssch.save();

    console.log(result);
    res.render("index");
  } catch (error) {
    console.log(error);
  }
});

module.exports = fromrouter;
