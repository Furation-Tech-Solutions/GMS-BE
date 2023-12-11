import mongoose from "mongoose";

const outletSchema = new mongoose.Schema({
  brandLogo: {
    type: String,
    default:
      "https://gms-media-assets.s3.ap-south-1.amazonaws.com/outletImage/1698736353747_coconutLog.coconutLogo",
  },

  outletName: {
    type: String,
    required: true,
    maxLength: [30, "Brand name should be under 30 Characters"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  fromEmail:{
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
    maxLength: [13, "Phone number should be under 13 Number"],
  },

  altPhone: {
    type: Number,
    maxLength: [13, " Alt. Phone number should be under 10 Number"],
  },
  address: {
    type: String,
    required: true,
    maxLength: [120, "Address should be under 120 Characters"],
  },
  city: {
    type: String,
    required: true,
    maxLength: [30, "City name should be under 30 Characters"],
  },
  state: {
    type: String,
    required: true,
    maxLength: [30, "State name should be under 30 Characters"],
  },
  country: {
    type: String,
    required: true,
    maxLength: [20, "Country name should be under 20 Characters"],
  },
  pincode: {
    type: Number,
    required: true,
    maxLength: [6, "Pincode should be under 6 Number"],
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
    },
  ],
  location:{
    type:String,
    default:"https://www.google.com/maps/place/The+Coconut+Boy/@19.0614885,72.8303614,15z/data=!4m6!3m5!1s0x3be7c9f1130a74af:0x3279d4b05f282c06!8m2!3d19.0614885!4d72.8303614!16s%2Fg%2F11y1jxllhg?entry=ttu"
  }
});

export const Outlet = mongoose.model("Outlet", outletSchema);
