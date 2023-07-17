const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { userModel } = require("../Model/user.model");
require(`dotenv`).config()

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,gender,password}=req.body;
        const existinguser=await userModel.find({email});
        if(existinguser){
            res.status(400).json({msg:"User already exists"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(error){
                    res.status(400).json({err:error})
                }else{
                    const user=new userModel({name,email,password:hash,gender});
                    await user.save();
                    res.status(200).json({msg:"User has been registered sucessfully",user:req.body});
                }
            })
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})
userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
           res.status(400).json({msg:"user not exists"})
        }else{
            bcrypt.compare(password,user.password,(err,decode)=>{
                if(decode){
                    const token=jwt.sign({userId:user._id,name:user.name},process.env.secretKey);
                    res.status(200).json({msg:"Logged in",token})
                }else{
                 res.status(400).json({error:err})
                }
            })
        }
    } catch (error) {
        res.status(400).json({err:error})
    }
})

module.exports={
    userRouter
}