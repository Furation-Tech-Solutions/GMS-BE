import mongoose from "mongoose";

const serversName = new mongoose.Schema({
  server_name: {
    type: String,
    unique: [true, "Server name should be unique"],
    required: [true, "Please fill server name"],
  },
  outletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    default: null,
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
export const ServersName = mongoose.model("serversName", serversName);
