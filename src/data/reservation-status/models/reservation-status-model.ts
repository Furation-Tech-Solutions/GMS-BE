import mongoose from "mongoose";

const reservationStatusSchema = new mongoose.Schema({
  // Name of the reservation status
  statusName: {
    type: String,
    maxLength: [30, "Reservation status name should be under 30 characters"],
    unique: true,
    trim: true,
    required: [true, "Reservation status name is required"],
  },
  // Initials for an icon associated with the status
  iconInitials: {
    type: String,
    trim: true,
    required: [true, "Reservation icon is required"],
  },
  // Color code for the status
  color: {
    type: String,
    maxLength: [30, "Color code should be under 30 characters"],
    trim: true,
    required: [true, "Color code is required"],
  },
  // Classification of the status (PRE_SERVICE or IN_SERVICE)
  classification: {
    type: String,
    enum: {
      values: ["PRE_SERVICE", "IN_SERVICE"],
      message: "Invalid classification value",
    },
  },
  // Whether the status is active or not (default is true)
  active: {
    type: Boolean,
    default: true,
  },
  // Duration in holds (optional)
  durationHolds: {
    type: Number,
  },
});

export const ReservationStatus = mongoose.model(
  "ReservationStatus",
  reservationStatusSchema
);
