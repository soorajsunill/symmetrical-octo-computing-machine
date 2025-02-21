import mongoose from "mongoose";

mongoose.connect("mongodb+srv://shop12:shop123@sample.kvxwkea.mongodb.net/shop")
    .then(()=>{console.log("connected to db");})
    .catch((err)=>console.log(err))