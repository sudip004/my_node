const mongoose=require("mongoose")

const info=new mongoose.Schema({
    Fname:{
        type:String,
        required:true
    },
    Lname:{
        type:String,
        required:true
    },
    roll:{
        type:Number,
        minlength:1
    }
})

const List=new mongoose.model("User",info);

module.exports=List;


// const doc=async()=>{
//     const react=new List({
//         Firstname:"shnnnmmmmmm",
//         Lastname:"basak",
//         roll:52
//     })

//     const res=await react.save();
// }



// const Register=mongoose.model("Users",info);
// module.exports=Register;