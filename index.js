require('dotenv').config()
const express=require("express");
const router=require("./router/app");
const path=require("path");
const bcrypt=require("bcryptjs")
const app=express();
const port=process.env.PORT || 3000;

require("./db/conn")

// database
const mongoose=require("mongoose")
// const db=require("./db/conn")
//const register=require("./models/register")
// 
const multer = require("multer");
const handlebars=require("handlebars")
const hbs= require("hbs");

//const doc = require("./models/register");
const List = require("./models/register");
const sss = require("./models/from");
const fromrouter = require("./router/fromrouter");
const { log } = require('console');
const { loadavg } = require('os');


const spath=path.join(__dirname,"./public")
const tempath=path.join(__dirname,"./templates/views");
const parpath=path.join(__dirname,"./templates/partials")

// handle routers
app.use(router);
app.use(fromrouter)
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// set view engens
app.set("view engine","hbs");
app.set("views",tempath)

// set partials
hbs.registerPartials(parpath)



app.get("/log",(req,res)=>{
   res.render("login")
})

app.post("/log",async(req,res)=>{
try {
   const fname=req.body.username
const pasword=req.body.pass
 const result= await sss.findOne({firstname : fname })

// if(result.lastname === lname){
//    console.log(result)
//    res.render("index")
// }else{
//    res.send("invalid")
// }
//console.log(pasword)

const repass=await bcrypt.compare(pasword,result.pass)

const token=await sss.genertoken()
console.log(repass)
if(repass){
   res.render("index")
}else{
   console.log("invalid cradintials");
}


} catch (error) {
   console.log(error);
}

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
