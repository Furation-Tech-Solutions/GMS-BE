import { strict } from "assert";
import { array, boolean, string } from "joi";
import mongoose from "mongoose";

// const tagRef = new mongoose.Schema(
//   {
//     tag: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "ClientTag",
//     },
//   },
//   { _id: false }
// );

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: [30, "firstName name should have less than 30 charcters"],
    minLength: [3, "firstName name should have more than 3 character"],
    required: [true, "please enter first Name"],
    // unique: true,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: [30, "lastName name should have less than 30 charcters"],
    minLength: [3, "lastName name should have more than 3 character"],
    required: [true, "please enter last Name"],
    // unique: true,
    trim: true,
  },
  salutation: {
    type: String,
    enum: ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."],
    required: true,
  },
  jobTitle: {
    type: String,
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
  tags: {
    type: [String],
    // ref: "ClientTags", give the id of tag from clientTagCategory.
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
  },
  altEmail: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
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
    type: Date,
  },
  anniversaryDate: {
    type: Date,
  },
  visits: {
    type: Number,
    default: 0,
  },
  spends: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "please Select the Gender"],
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Client = mongoose.model("Client", clientSchema);
