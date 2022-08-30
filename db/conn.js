const mongoose=require("mongoose");
const doc=require("../models/register")

const url="mongodb://localhost:27017/test"
const db=mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>console.log("connection........"))
.catch((err)=>console.log(err));

// const info=new mongoose.Schema({
//     Firstname:{
//         type:String,
//         required:true
//     },
//     Lastname:{
//         type:String,
//         required:true
//     }
// })

// const List=new mongoose.model("User",info);

// const document=async()=>{
//     try {
//         const react=new List({
//             Firstname:"sudip",
//             Lastname:"basak"
//         })
//         const r=new List({
//             Firstname:"sayan",
//             Lastname:"basak"
//         })
//         const reac=new List({
//             Firstname:"rohan",
//             Lastname:"basak"
//         })
//         // const result= await List.insertMany([react, r, reac]) 
//         const result= await react.save();
//         console.log(result)
//     } catch (error) {
//         console.log(error)
//     }
    
// }











//157.40.151.189