const express = require("express")
const jwt= require("jsonwebtoken")
const sss = require("../models/from");

const auth=async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    const verify= jwt.verify(token, process.env.SECRET_KEY)
    console.log(verify)

    const user= await sss.findOne({_id : verify._id})
    console.log(user);
    
    req.token=token
    req.user=user
    next()
  } catch (error) {
    console.log(error);
  }
}

module.exports=auth;