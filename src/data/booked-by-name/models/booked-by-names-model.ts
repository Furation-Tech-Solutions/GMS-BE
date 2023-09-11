import mongoose from "mongoose";

const bookedByNameSchema=new mongoose.Schema({
   name:{
    type:String,
    default :true
   }

})
export const BookedByName = mongoose.model("bookedByName",bookedByNameSchema)
