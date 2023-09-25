import { strict } from "assert";
import { array, boolean, object, string } from "joi";
import mongoose from "mongoose";

const reservationTagSchema = new mongoose.Schema({
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
    ref: "ReservationTagCategory",
    required: [true, "Please enter a category name"],
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccount",
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccount",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ReservationTag = mongoose.model(
  "ReservationTag",
  reservationTagSchema
);
