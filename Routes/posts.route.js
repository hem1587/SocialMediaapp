const express=require("express");
const { auth } = require("../middleware/auth.middleware");
const { postModel } = require("../Model/posts.model");


const postRouter=express.Router();
postRouter.use(auth)

postRouter.get("/",async(req,res)=>{
    try {
        const posts=await postModel.find({userID:req.body.userID});
        if(posts){
            res.status(200).json({posts})
        }else{
            res.status(400).json({msg:"posts not found"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})
postRouter.post("/post",async(req,res)=>{
    try {
        const post=new postModel(req.body);
        await post.save();
        res.json({msg:"created sucessfully"})
    } catch (error) {
        res.json(error)
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const userID=req.body.userID;
        const postid=req.params.id;
        const post=await postModel.find({_id:postid});
        const userIDinpost=post.userID;
        if(userID==userIDinpost){
            await postModel.findByIdAndUpdate({_id:postid},req.body);
            res.status(200).json({msg:`${post.title} has updated`})
        }else{
            res.status(400).json({msg:"please authenticate"})
        }

    } catch (error) {
        res.status(400).json({error:error})
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const postid=req.params.id;
        const userID=req.body.userID;
        const post=await postModel.find({_id:postid});
        const userIDinpost=post.userID;
        if(userID==userIDinpost){
            await postModel.findByIdAndDelete({_id:postid});
            res.status(200).json({msg:"post deleted"})
        }else{
            res.status(400).json({msg:"please authenticate"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})
module.exports={
    postRouter
}