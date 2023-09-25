import mongoose from "mongoose";

const taxRateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
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
export const TaxRate = mongoose.model("taxRate", taxRateSchema);
