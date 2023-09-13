import mongoose from "mongoose";

const addReservationSchema = new mongoose.Schema({
  //Availability
  date: {
    type: String,
    trim: true,
    required: [true, "please Select the Date"],
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    required: [true, "please Select the Shift"],
  },
  duration: {
    type: String,
    trim: true,
    default: "2 hr",
    // required: [true, "please Select the Duration"],
  },
  seatingArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatingArea",
    required: [true, "please Select the Seating Area"],
  },
  timeSlot: {
    type: String,
    trim: true,
    required: [true, "please Select the Time Slot"],
  },

  // Client
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "please Select the Client"],
  },

  // Source
  // source: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Users",
  // },

  // Aditional Detail
  resevationTags: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ReservationTagCategory" },
  ],
  reservationNote: {
    type: String,
    maxlength: [2000, "lastName should have less than 30 charcters"],
    minLength: [1, "lastName should have more than 3 character"],
    trim: true,
  },

  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: [true, "please Select the Table"],
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookedByName",
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
