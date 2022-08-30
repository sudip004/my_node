const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const stinfo=new mongoose.Schema({
    firstname:{
        type:String
    },
    pass:{
       type:String
    },
    Course:{
        type:String
    },
    tokens:[{
        token:{
            type:String 
        }
    }]
})


// use middleware for token 
stinfo.methods.genertoken=async function(){
    try {
      console.log(`${this._id}`);
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY)
        console.log(process.env.SECRET_KEY)
       
        this.tokens =  this.tokens.concat({token : token})
       await this.save()
    console.log(token);
    return token
    } catch (error) {
        console.log(error);
    }

}

// for use middleware hash password
stinfo.pre("save",async function(next){
this.pass=await bcrypt.hash(this.pass,8)
next()
})

const sss=new mongoose.model("Info",stinfo);
module.exports=sss;