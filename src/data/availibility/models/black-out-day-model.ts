import mongoose, { Schema, Model } from 'mongoose';
import { IBlackoutDay } from 'types/availibility/black-out-type';

const blackoutTypeSchema = new mongoose.Schema({
  reservation: {
    type: Boolean,
    default: false,
  },
  guestList: {
    type: Boolean,
    default: false,
    
  },
}, { _id: false }); 

const blackoutSchema: Schema<IBlackoutDay> = new Schema<IBlackoutDay>({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  day: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  blackout: {
   type: blackoutTypeSchema,
   required: false
  },
});

// Create a model based on the schema
const BlackoutDay: Model<IBlackoutDay> = mongoose.model('BlackoutDay', blackoutSchema);

export default BlackoutDay;
