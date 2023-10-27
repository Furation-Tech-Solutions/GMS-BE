import mongoose from "mongoose";

// const reservationTime = new mongoose.Schema(
//   {
//     reservation_id: String,
//     startTime: String,
//     duration: String,
//     endTime: String,
//   },
//   { _id: false }
// );

const tableSchema = new mongoose.Schema({
  tableNo: {
    type: String,
    required: true,
    unique: true,
  },
  partySizeMini: {
    type: Number,
    required: true,
  },
  partySizeMax: {
    type: Number,
    required: true,
  },
  tableCombinations: [String],
  isBlocked: {
    type: Boolean,
    default: false,
  },
  seatingArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatingArea",
    required: true,
  },
  // reservedTimes: [reservationTime],
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
});

export const Table = mongoose.model("Table", tableSchema);
