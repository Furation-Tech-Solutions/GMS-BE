import mongoose from "mongoose";

const addReservationSchema = new mongoose.Schema({
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
    maxlength: [30, "lastName should have less than 30 charcters"],
    minLength: [3, "lastName should have more than 3 character"],
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
  confirmationMailSending: {
    type: Boolean,
    default: false,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    // required: [true, "Please enter user_id"],
  },
  aditionalGuest: {
    type: [String],
  },
  reservationTags: {
    type: [String],
  },
  notes: {
    type: String,
    maxLength: [500, "notes should have less then 500 charcters "],
    minLength: [10, "notes should have 10 charcters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const AddReservation = mongoose.model(
  "AddReservation",
  addReservationSchema
);
