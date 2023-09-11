import mongoose from "mongoose";

const outletSchema = new mongoose.Schema({
  brandLogo: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjMMn47-RwsiJ19C6Kzifjv7BZL12EQ7yhj_hPBdFZw&s",
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
  // admins: [
  //   {
  //     // Define properties for each admin
  //     adminName: {
  //       type: String
  //     },
  //   }
  //   ]
  admins: [
    {
      type: String,
      ref: "Admin",
    },
  ],
});

export const Outlet = mongoose.model("Outlet", outletSchema);
