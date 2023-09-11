import mongoose from "mongoose";

const seatingAreaSchema = new mongoose.Schema({
  abbreviation: {
    type: String,
    maxLength: [30, "Abbreviation should be under 30 Characters"],
    uppercase: true,
    trim: true,
    required: true,
  },
  seatingAreaName: {
    type: String,
    required: true,
    maxLength: [30, "Sating area name should be under 30 Characters"],
    trim: true,
    unique: true,
  },
  listOrder: {
    type: Number,
    required: true,
    unique: true,
  },
});

export const SeatingArea = mongoose.model("SeatingArea", seatingAreaSchema);
