import { strict } from "assert";
import { array, boolean, object, string } from "joi";
import mongoose from "mongoose";

const clientTagSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name should have at least 3 characters"],
        maxlength: [30, "Name should have less than 30 characters"],
        required: [true, "Please enter a name"],
        unique: true,
        trim: true,
    },
    categoryNameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientTagCategory",
        required: [true, "Please enter a category name"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const ClientTag = mongoose.model('ClientTag', clientTagSchema);