import mongoose from "mongoose";

const addReservationSchema = new mongoose.Schema({
  // Availability
  date: {
    type: String,
    trim: true,
    required: [true, "Please select the Date"],
  },
  noOfGuests: {
    type: Number,
    require: [true, "Please select the Date"],
    default: 1,
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    required: [true, "Please select the Shift"],
  },
  duration: {
    type: String,
    trim: true,
    default: "2:00:00",
    // required: [true, "Please select the Duration"],
  },
  seatingArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatingArea",
    required: [true, "Please select the Seating Area"],
  },
  timeSlot: {
    type: String,
    trim: true,
    required: [true, "Please select the Time Slot"],
  },
  // Client
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "Please select the Client"],
  },

  // Additional Detail
  reservationTags: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ReservationTagCategory" },
  ],

  reservationNote: {
    type: String,
    maxlength: [2000, "Last name should have less than 2000 characters"],
    minLength: [1, "Last name should have more than 1 character"],
    trim: true,
    default: null,
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: [true, "Please select the Table"],
  },
  bookedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookedByName",
    default: null,
  },
  perks: {
    type: String,
    maxlength: [500, "Perks should have less than 500 characters"],
    minLength: [10, "Perks should have at least 10 characters"],
    trim: true,
    default: null,
  },

  confirmationMailSending: {
    type: Boolean,
    default: false,
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
    default: Date.now(),
  },
});

export const AddReservation = mongoose.model(
  "AddReservation",
  addReservationSchema
);
