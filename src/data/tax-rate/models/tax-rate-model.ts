import mongoose from "mongoose";

const taxRateSchema=new mongoose.Schema({
   type:{
    type:String,
    default:true
   },
   percentage:{
    type:Number,
    default:true
   }
   
})
export const TaxRate = mongoose.model("taxRate",taxRateSchema)

