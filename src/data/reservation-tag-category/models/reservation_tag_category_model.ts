import { strict } from "assert";
import { array, boolean, object, string } from "joi";
import mongoose from "mongoose";

const reservationTagCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name should have at least 3 characters"],
        maxlength: [30, "Name should have less than 30 characters"],
        required: [true, "Please enter a name"],
        unique: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
    },
    classification: {
        global:  { type: Boolean, default: false },
        local:  { type: Boolean, default: false },
    },
    vip:  { type: Boolean, default: false },
    display: {
        visible_to_superusers_only:  { type: Boolean, default: false },
        show_on_chit:  { type: Boolean, default: false },
        show_on_reservation_summary:  { type: Boolean, default: false },
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount",
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReservationTag",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const ReservationTagCategory = mongoose.model('ReservationTagCategory', reservationTagCategorySchema);



