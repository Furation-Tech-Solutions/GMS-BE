import { strict } from "assert";
import { array, boolean, string } from "joi";
import mongoose from "mongoose";

// const bookedByData = new mongoose.Schema(
//   {
//     id: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//   },
//   { _id: false }
// );

// const options = { timeZone: "Asia/Kolkata" };
// const currentDate = new Date().toLocaleString("en-US", options);
// const date = new Date(currentDate);
// console.log(date);

const guestSchema = new mongoose.Schema(
  {
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
      maxlength: [30, "lastName should have less than 30 charcters"],
      minLength: [3, "lastName should have more than 3 character"],
      required: [true, "please enter last Name"],
      // unique: true,
      trim: true,
    },
    email: {
      type: String,
      // unique: true,
      trim: true,
      required: true,
      lowercase: true,
    },
    confirmationMailSending: {
      type: Boolean,
      default: false,
    },
    bookedBy: {
      // type: bookedByData,
      _id: {
        type: String,
        // required: true,
        default: null,
      },
      name: {
        type: String,
        // required: true,
        default: null,
      },
    },
    // bookedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "UserAccount",
    //     required: [true, "Please enter user_id"],
    // },
    additionalGuest: {
      type: [String],
    },
    reservationTags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReservationTag",
      },
    ],
    status: {
      type: String,
      enum: ["Checked In", "Checked Out", "No Status"],
      default: "No Status",
    },
    notes: {
      type: String,
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
      default: function () {
        const options = { timeZone: "Asia/Kolkata" };
        const currentDate = new Date().toLocaleString("en-US", options);
        return new Date(currentDate);
      },
    },
  },
  { timestamps: true }
);

export const Guest = mongoose.model("Guest", guestSchema);
