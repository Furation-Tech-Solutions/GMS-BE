import { strict } from "assert";
import { array, boolean, string } from "joi";
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
}, { _id: true });

const bookingRequestSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: [30, "firstName name should have less than 30 charcters"],
        minLength: [3, "firstName name should have more than 3 character"],
        required: [true, "please enter first Name"],
        // unique: true,
        trim: true,
    },
    lastName: {
        type: String,
        maxlength: [30, "lastName name should have less than 30 charcters"],
        minLength: [3, "lastName name should have more than 3 character"],
        required: [true, "please enter last Name"],
        // unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
    },
    phone: {
        type: String,
        maxLength: [
            13,
            "Phone Number should have 13 charcters included country code",
        ],
        minLength: [
            13,
            "Phone Number should have 13 charcters included country code",
        ],
        required: [true, "please enter  Phone Number"],
        trim: true,
    },
    specialInstructions: {
        type: String,
        maxLength: [2000, "Special Instructions should have less then 2000 charcters"],
    },
    reservationDate: { type: String },
    reservationtime: { type: String },
    numberOfGuest: { type: Number },
    duration: String,
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
    },
    // logs: [logSchema],
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

export const BookingRequest = mongoose.model("BookingRequest", bookingRequestSchema);



