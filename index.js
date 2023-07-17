const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const { postRouter } = require("./Routes/posts.route");
require("dotenv").config();


const app=express();
app.use(express.json());

app.use("/users",userRouter);
app.use("/posts",postRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("connected to db");
        console.log(`Running at ${process.env.PORT}`)
    }catch(err){
        console.log(err)
    }
})