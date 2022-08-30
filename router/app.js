
const express=require("express")
const router= new express.Router();
require("../db/conn")
const List=require("../models/register")
router.use(express.json())

router.get("/login",async(req,res)=>{
    const ress=await List.find();
    const ass=await List.count();
    res.status(201).send(ress)
    console.log(ass)
 })
 
 router.post("/login",async(req,res)=>{
    try {
       const st=new List(req.body)
       const result=await st.save();
       res.status(200).send(result)
        console.log(result);
    } catch (error) {
       console.log(error)
    }
    })

router.get("/login/:id",async(req,res)=>{
    const _id=req.params.id
       const sd=await List.findById(_id)
       res.status(201).send(sd)
       console.log(sd);
 })
 
router.patch("/login/:id",async(req,res)=>{
 try {
    const _id=req.params.id
    const result =await List.findByIdAndUpdate(_id,req.body,{
       new:true
    })          //age ki 6ilo ata dakhar jonno req.body....new use kora hoye6a update value dakher jonno
    res.send(result)
 } catch (error) {
    
 }
 })
 
 router.delete("/login/:id",async(req,res)=>{
  try {
    const _id=req.params.id;
    const resule=await List.findByIdAndDelete(_id)
 if(!resule){
    console.log("This is error for delete")
 }else{
    res.send(resule)
 }
  } catch (error) {
    console.log(error)
  }
 })

module.exports=router;