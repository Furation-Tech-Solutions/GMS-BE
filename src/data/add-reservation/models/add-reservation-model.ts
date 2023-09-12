import mongoose from "mongoose";

const addReservationSchema = new mongoose.Schema({
  //Availability
  date: {
    type: String,
    trim: true,
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
  },
  duration: {
    type: String,
    trim: true,
  },
  seatingArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatingArea",
  },
  timeSlot: {
    type: String,
    trim: true,
  },

  // Client
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },

  // Source
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  // Aditional Detail
  resevationStatus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  reservationNote: {
    type: String,
    maxlength: [2000, "lastName should have less than 30 charcters"],
    minLength: [1, "lastName should have more than 3 character"],
    trim: true,
  },

  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  perks: {
    type: String,
    maxLength: [2000, "notes should have less then 500 charcters "],
    minLength: [5, "notes should have 10 charcters"],
    trim: true,
  },

  confirmationMailSending: {
    type: Boolean,
    default: false,
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
