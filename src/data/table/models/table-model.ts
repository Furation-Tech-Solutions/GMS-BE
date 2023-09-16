import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNo: {
    type: Number,
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
  tableCombinations: [
    {
      mergeable_with: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
      },
    },
  ],
  seatingArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatingArea",
    required: true,
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
});

export const Table = mongoose.model("Table", tableSchema);
