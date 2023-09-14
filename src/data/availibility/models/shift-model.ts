

import mongoose from 'mongoose';
import { Schema, Model, model } from 'mongoose';
import { IShiftProperty } from 'types/availibility/schema-type';


const durationAverageTurnTimeSchema = new mongoose.Schema({
  partySize: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
}, { _id: false }); 

const timeCutOffSchema = new mongoose.Schema({
      value: { type: Number },
      unit: {
        type: String,
        enum: ['Indefinitely', 'HoursInAdvance', 'DaysInAdvance', 'WeeksInAdvance', 'MonthsInAdvance'],
        default: 'Indefinitely',
      },
      reservationTime: String
  
}, { _id: false }); 

const howFarInAdvanceCanReservationsBeBookedInternallySchema = new mongoose.Schema({
    value: { type: Number },
    unit: {
      type: String,
      enum: ['Indefinitely', 'HoursInAdvance', 'DaysInAdvance', 'WeeksInAdvance', 'MonthsInAdvance'],
      default: 'Indefinitely',
    },
    reservationTime: String
}, { _id: false }); 

// Define the schema
const shiftPropertySchema = new Schema<IShiftProperty>({
  shiftName: {
    type: String,
    required: true,
    maxLength: [30, "Shift name should be under 30 Characters"],
  },
  shiftCategory: {
    type: String,
    enum: ['breakfast', 'brunch', 'lunch', 'day', 'dinner', 'night'],
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    default: null, // Use null as a default value for indefinite end date
  },
  daysToRepeatThisShift: {
    type: [String],
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    default: [],
  },  
  firstSeating: {
    type: String,
    required: true,
  },
  lastSeating: {
    type: String,
    required: true,
  },
  timeInterval: {
    type: Number,
    validate: {
      validator: function (value: number) {
        return [15, 30, 60].includes(value);
      },
      message: 'Time interval must be 15, 30, or 60 minutes',
    },
    required: true,
  },
  floorPlanLayout: {
    type: String,
    required: true,
    default: 'default',
  },
  seatingAreasAvailable: {
    type: [String],
    enum: ['Restaurant', 'Bar', 'SushiBar', 'Prive', 'PriveBar'],
    default: [],
  },
  howFarInAdvanceCanReservationsBeBookedInternally: {
      type: howFarInAdvanceCanReservationsBeBookedInternallySchema
  },
  partySizeMin: {
    type: Number,
    required: true,
    default: 1,
  },
  partySizeMax: {
    type: Number,
    required: true,
    default: 30,
  },
  enforceForUsersWithoutPartySizeOverbookingPermission: {
    type: Boolean,
    default: false,
  },
  durationAverageTurnTimeBasedOnPartySize: [
   durationAverageTurnTimeSchema
  ],
  pacing: {
    type: Number,
    required: true,
  },
  setMaximumTotalCoversForShift: {
    type: String,
  },
  allowDoubleBookingOnSameTables: {
    type: Boolean,
    default: false,
  },
  modifyBookingNotification: {
    type: String,
    enum: ['At Any Time', 'Never', 'Up Until Cut-off Time'],
    default: 'At Any Time',
  },

  timeBeforeCutOff: {
    type: timeCutOffSchema,
  }, 

  bookingPolicy: {
    type: String,
    enum: ['Default Booking Policy', 'Custom Policy'],
  },
  policyDescription: {
    type: String,
    required: false  
  },
  addSelectableUpgrades: {
    type: Boolean,
    default: false,
  },
});


const Shift: Model<IShiftProperty> = model<IShiftProperty>('Shift', shiftPropertySchema);

export default Shift;
