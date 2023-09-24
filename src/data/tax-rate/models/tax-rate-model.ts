import mongoose from "mongoose";

const taxRateSchema=new mongoose.Schema({
   type:{
    type:String,
    required:true
   },
   percentage:{
    type:Number,
    required:true
   }
   
})
export const TaxRate = mongoose.model("taxRate",taxRateSchema)
