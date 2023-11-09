import mongoose from "mongoose";


export interface ILogger {
    level: string;
    timestamp: string;
    message: string;
    client: mongoose.Schema.Types.ObjectId;
    reservation: mongoose.Schema.Types.ObjectId;
}