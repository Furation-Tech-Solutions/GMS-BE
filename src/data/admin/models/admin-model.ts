import mongoose from "mongoose";

import { Model } from "mongoose";

import { IAdminModel } from "types/db";


const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [53, "name should be under 53 Characters"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: Number,
    required: true,
    maxLength: [13, "Phone number should be under 13 Number"],
  },
  brand: {
    type: String,
    maxLength: [30, "Brand name should be under 30 Characters"],
    trim: true,
  },
  jobTitle: {
    type: String,
    maxLength: [30, "Job Title name should be under 30 Characters"],
    trim: true,
  },
  superAdmin: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  permissions: {
    type: [Number],
  },
  active: {
    type: Boolean,
    default: true,
  },
  outlet: {
    type: String,
    ref: "Outlet",
  },
  fuid: {
    type: String,
    maxLenght: [28, "Fuid should be under 28 Characters"],
    required: false,  //TODO: If required the change the boolean 
  },
});

export const Admin: Model<IAdminModel> = mongoose.model<IAdminModel>("Admin", adminSchema);
