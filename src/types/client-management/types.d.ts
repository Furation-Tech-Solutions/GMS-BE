import mongoose, { Document } from "mongoose";

interface ICheckIn extends Document {
  client: mongoose.Types.ObjectId;
  table: mongoose.Types.ObjectId;
  checkInTime: string;
}

interface IDiscount extends Document {
  type: string;
  amount: number;
}

interface ITax extends Document {
  type: string;
  amount: number;
}

interface ICheckOutItem extends Document {
  menuItem: mongoose.Types.ObjectId | IMenuItem;
  quantity: number;
  customization: string;
  price: number;
}

interface ICheckOut extends Document {
  reservation: mongoose.Types.ObjectId;
  client: mongoose.Types.ObjectId;
  checkInTime: string;
  checkOutTime: string;
  table: mongoose.Types.ObjectId;
  // prePayment: number;
  // onSitePayment: number;
  totalBill: number;
  paymentMethod: string;
  paymentDetails: string;
  paymentStatus: "Pending" | "Paid";
  notes: string;
  feedback: {
    rating: number;
    comments: string;
  };
  outletId: mongoose.Types.ObjectId;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
}
