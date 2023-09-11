import mongoose from "mongoose";

const accessLevelSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true,
    },
    permissions:mongoose.Schema.Types.Mixed,
    emailSubscription:mongoose.Schema.Types.Mixed

})

export const AccessLevel = mongoose.model("AccessLevel", accessLevelSchema);
