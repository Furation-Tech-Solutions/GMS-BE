import mongoose from "mongoose";


const serversName=new mongoose.Schema({
    server_name:{
        type:String,
        required:true
    }
})
export const ServersName = mongoose.model("serversName",serversName)
