import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  abbreviation: {
    type: String,
    maxLength: [30, "Abbreviation should be under 30 Characters"],
    uppercase: true,
    trim: true,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
    maxLength: [30, "Room name should be under 30 Characters"],
    trim: true,
    unique: true,
  },
  listOrder: {
    type: Number,
    required: true,
    unique: true,
  },
});

export const Room = mongoose.model("Room", roomSchema);
