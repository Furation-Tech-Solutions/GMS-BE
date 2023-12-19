import { strict } from "assert";
import { array, boolean, string } from "joi";
import mongoose from "mongoose";

const tagRef = new mongoose.Schema(
  {
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientTag",
    },
  },
  { _id: false }
);

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: [30, "firstName name should have less than 30 charcters"],
    minLength: [1, "firstName name should have more than 1 character"],
    required: [true, "please enter first Name"],
    // unique: true,
    trim: true,
    // index: true, // Index on firstName field
  },
  lastName: {
    type: String,
    maxlength: [30, "lastName name should have less than 30 charcters"],
    required: [false, "please enter last Name"],
    // unique: true,
    default: "",
    trim: true,
    // index: true, // Index on lastName field
  },
  salutation: {
    type: String,
    enum: ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."],
    required: true,
  },
  jobTitle: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "",
  },
  company: {
    type: String,
  },
  profileNotes: {
    type: String,
  },
  privateNotes: {
    type: String,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientTag",
    },
  ],
  email: {
    type: String,
    unique: false,
    trim: true,
    default: "",
    required: false,
    lowercase: true,
  },
  altEmail: {
    type: String,
    trim: true,
    lowercase: true,
    required: false, // Use "required" instead of "require"
    default: "",
  },
  phone: {
    type: String,
    maxLength: [
      10,
      "Phone Number should have 10 charcters included country code",
    ],
    minLength: [
      10,
      "Phone Number should have 10 charcters included country code",
    ],
    required: [true, "please enter  Phone Number"],
    trim: true,
  },
  workPhone: {
    type: String,
    maxLength: [
      13,
      "Phone Number should have 13 charcters included country code",
    ],
    minLength: [
      10,
      "Phone Number should have 13 charcters included country code",
    ],
    // required: [true, "please enter  Phone Number"],
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    // required: [true, "please enter address"],
  },
  city: {
    type: String,
    trim: true,
    // required: [true, "please enter city"],
  },
  state: {
    type: String,
    trim: true,
  },
  pincode: {
    type: String,
  },
  country: {
    type: String,
  },
  contactInfoVisibilityOnlyToSuperUser: {
    type: Boolean,
    default: false,
  },
  birthDate: {
    type: String,
  },
  anniversaryDate: {
    type: String,
  },
  visits: {
    type: Number,
    default: 0,
  },
  reservationCencel: {
    type: Number,
    default: 0,
  },
  // visiteDate: [String],

  spends: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "please Select the Gender"],
  },
  language: {
    type: String,
    default: "English",
  },
  isClient: {
    type: Boolean,
    default: false,
  },
  outletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    default: null,
    index: true, // Index on outletId field
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
  activityLogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Log",
      default: null,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Client = mongoose.model("Client", clientSchema);
