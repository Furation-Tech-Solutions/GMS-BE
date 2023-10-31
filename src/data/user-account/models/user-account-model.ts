import mongoose from "mongoose";

const validateEmail = function (email: string) {
  var result = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return result.test(email);
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
  },
  jobTitle: {
    type: String,
    required: false,
  },
  accessLevel: {
    type: String,
    enum: [
      "Superuser",
      "Manager",
      "Sub-Manager"
    ],
  },
  profileImage: {
    type: String,
    default: false
  },
  managerSettings: {
    emailAlertsEnabled: {
      type: Boolean,
      default: true,
    },
    multifactorAuthenticationEnabled: {
      type: Boolean,
      default: true,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: String,
      default: "",
    },
    lastPasswordReset: {
      type: String,
      default: "",
    },
  },
  isLogin: {
    type: Boolean,
    default: false,
  },
  permissions: {
    type: [],
    default: false
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
  firebaseDeviceToken: {
    type: [String],
    default: []
  },
  outlet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet",
    }
  ]
});

export const UserAccount = mongoose.model("UserAccount", userSchema);
