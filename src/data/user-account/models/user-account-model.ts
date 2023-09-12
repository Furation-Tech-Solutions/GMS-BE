

import mongoose from "mongoose";

const validateEmail = function (email: string) {
    var result = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return result.test(email);
  };

  const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
  jobTitle: {
    type: String,
    required: false
  },
  accessLevel: {
    type: String,
    enum: ["Superuser", "User Manager Only", "Manager","Sub-Manager", "Basic","Basic iPad"]
  },
  managerSettings: {
    emailAlertsEnabled: {
      type: Boolean,
      default: true
    },
    multifactorAuthenticationEnabled: {
      type: Boolean,
      default: true
    },
    suspended: {
      type: Boolean,
      default: false
    },
    lastLogin: {
      type: String,
      default: ""
    },
    lastPasswordReset: {
      type: String,
      default: ""
    },
    },
    permissions: {
        type: [Number], 
        default: [],    
      },
      emailNotification: {
        type: [Number], 
        default: [],    
      },
  })

export const UserAccount = mongoose.model("UserAccount", userSchema);
