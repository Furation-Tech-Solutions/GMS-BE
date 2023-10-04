import mongoose, { Schema, Model } from 'mongoose';
import { ICheckOut } from "types/client-management/types";


const checkInCheckOutSchema: Schema<ICheckOut> = new Schema<ICheckOut>({
    resrvation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AddReservation',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    checkInTime: String,

    checkOutTime: String,

    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
    },
    totalBill: Number,
    paymentMethod: String,
    paymentDetails: String,

    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },

    notes: String,

    feedback: {
      rating: Number,
      comments: String,
    },
    
    billingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
    },
  });


  
  export const CheckInCheckOut: Model<ICheckOut> = mongoose.model<ICheckOut>('CheckInCheckOut', checkInCheckOutSchema);
  
    