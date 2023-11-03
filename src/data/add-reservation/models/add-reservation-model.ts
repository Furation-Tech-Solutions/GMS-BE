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
    required: [true, "Please select the Date"],
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
    required: [true, "Please select the Duration"],
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

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "Please select the Client"],
  },
  reservationTags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReservationTag",
    },
  ],
  reservationNote: {
    type: String,
    maxlength: [2000, "Last name should have less than 2000 characters"],
    trim: true,
    default: "",
  },
  reservationStatus: {
    type: String,
    trim: true,
    default: "unassigned",
  },

  table: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: [false, "Please select the Table"],
  }
],
  bookedBy: {
    type: String,
    default: "",
  },

  serverName: {
    type: String,
    default: "",
  },
  perks: {
    type: String,
    maxlength: [500, "Perks should have less than 500 characters"],
    trim: true,
    default: "",
  },

  confirmationMailSending: {
    type: Boolean,
    default: false,
  },
  prePayment: {
    type: Number,
    required: [false, "Please fill pre payment"],
    default: 0,
  },
  onSitePayment: {
    type: Number,
    required: [false, "Please fill onsite payment"],
    default: 0,
  },
  outletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccount",
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccount",
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AddReservation = mongoose.model(
  "AddReservation",
  addReservationSchema
);
