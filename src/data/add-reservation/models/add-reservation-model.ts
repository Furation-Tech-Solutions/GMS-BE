// Importing Mongoose library for schema creation
import mongoose from "mongoose";

// Creating a schema for adding reservations
const addReservationSchema = new mongoose.Schema({
  // Date of the reservation
  date: {
    type: String,
    trim: true,
    required: [true, "Please select the Date"],
  },

  // Number of guests for the reservation
  noOfGuests: {
    type: Number,
    required: [true, "Please specify the number of Guests"],
    default: 1,
  },

  // Associated shift for the reservation
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    required: [true, "Please select the Shift"],
  },

  // Duration of the reservation
  duration: {
    type: String,
    trim: true,
    default: "2:00:00",
    required: [true, "Please select the Duration"],
  },

  // Seating area for the reservation
  seatingArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatingArea",
    required: [true, "Please select the Seating Area"],
  },

  // Time slot for the reservation
  timeSlot: {
    type: String,
    trim: true,
    required: [true, "Please select the Time Slot"],
  },

  // Associated client for the reservation
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "Please select the Client"],
  },

  // Tags associated with the reservation
  reservationTags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReservationTag",
    },
  ],

  // Additional notes for the reservation
  reservationNote: {
    type: String,
    maxlength: [2000, "Note should have less than 2000 characters"],
    trim: true,
    default: "",
  },

  // Status of the reservation
  reservationStatus: {
    type: String,
    trim: true,
    default: "unassigned",
  },

  // Table(s) allocated for the reservation
  table: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: [false, "Please select the Table"],
    },
  ],

  // Person who booked the reservation
  bookedBy: {
    type: String,
    default: "",
  },

  // Server assigned to the reservation
  serverName: {
    type: String,
    default: "",
  },

  // Perks offered for the reservation
  perks: {
    type: String,
    maxlength: [500, "Perks should have less than 500 characters"],
    trim: true,
    default: "",
  },

  // Confirmation mail sending status
  confirmationMailSending: {
    type: Boolean,
    default: false,
  },

  // Pre-payment made for the reservation
  prePayment: {
    type: Number,
    required: [false, "Please fill in pre-payment"],
    default: 0,
  },

  // On-site payment made for the reservation
  onSitePayment: {
    type: Number,
    required: [false, "Please fill in on-site payment"],
    default: 0,
  },

  // Associated outlet ID for the reservation
  outletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    default: null,
    index: true, // Index on outletId field
  },

  // User who last updated the reservation
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccount",
    default: "",
  },

  // User who created the reservation
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccount",
    default: "",
  },

  // Timestamp for the creation of the reservation
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating a Mongoose model 'AddReservation' using the defined schema
export const AddReservation = mongoose.model(
  "AddReservation",
  addReservationSchema
);
