import mongoose from "mongoose";

const bookedByNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  outletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet"
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
export const BookedByName = mongoose.model("bookedByName", bookedByNameSchema);
