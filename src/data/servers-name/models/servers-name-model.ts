import mongoose from "mongoose";

const serversName = new mongoose.Schema({
  server_name: {
    type: String,
    unique: [true, "Server Name Should Be Unique"],
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
export const ServersName = mongoose.model("serversName", serversName);
