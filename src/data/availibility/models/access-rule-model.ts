
import mongoose, { Model, Schema } from 'mongoose';
import { IAccessRuleDocument } from 'types/availibility/access-rule-type';

// Define interfaces for the document and model

const guestFacingSchema = new mongoose.Schema({
    widgetTimeSlotDescription: String,
    timeSlotDescription: String,
    title: String,
    longDescription: String,
    image: String, // You can store the image URL or file path
    linkToOffer: String,
    allowBookingOnChannelsWithoutDisplayFields: Boolean,
}, { _id: false })

const paymentPolicySchema = new mongoose.Schema({
  folllowShift: {
    type: Boolean,
  },
  timeBeforeCutOff: {
    type: Number,
    default: 60,
  },
  bookingPolicy: {
    type: String,
    enum: ['Default Booking Policy', 'Custom Policy'],
  },
  policyDescription: {
    type: String,
    required: false
  },
  allowCreditCard: {
    type: Boolean
  },
  bundleUpgrade: {
    type: Boolean,
  }
}, { _id: false });


const bookingChannels = new Schema({
  AudienceTier: {
    type: [String],
    enum: ["Direct Booking Channels", "Third Party Booking Channels", "Waitlist"]
  },
  value: { type: Number, default: 90 },
      unit: {
        type: String,
        enum: ['hours', 'days', 'weeks', 'months', 'reservation_time'],
        default: 'hours',
      },
      reservationTime: String
},  { _id: false });

const partySizeSchema = new Schema({
  minPartySize: {
    type: Number,
    required: false,
    default: 2,
  },
  maxPartySize: {
    type: Number,
    required: false,
    default: 12,
  },
},  { _id: false });

const seatingAreaSchema = new Schema({
  SeatingAreaName: {
    type: [String],
    required: true,
  },
  exclusive: {
    type: Boolean,
    default: false,
  },
},  { _id: false });

const customPacingPerSeatingIntervalSchema = new Schema({
    startTime:  String ,
    maxCovers: Number ,
},  { _id: false });

const bookingWindowSchema = new Schema({
  guestBookingStartTime: {

      value: { type: Number, default: 90 },
      unit: {
        type: String,
        enum: ['hours', 'days', 'weeks', 'months', 'reservation_time'],
        default: 'hours',
      },
      reservationTime: String

  },
  guestBookingCutoffTime: {
      value: { type: Number, default: 24 },
      unit: {
        type: String,
        enum: ['hours', 'days', 'weeks', 'months', 'reservation_time'],
        default: 'hours',
      },
      reservationTime: String
  },

},  { _id: false });

const maxReservationOrCoverLimitSchema = new Schema({
  
  perDay: { type: Number, default: 0 }, // Default to no limit (0 means no limit);
      unit: {
        type: String,
        enum: ['Reservations', 'Covers']
      }

},  { _id: false });



// Define the schema
const accessRuleSchema: Schema<IAccessRuleDocument> = new Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
  },
  isIndefinite: {
    type: Boolean,
    default: false,
  },
  daysOfWeek: {
    type: [String],
    required: true,
    validate: {
      validator: function (days: string[]) {
        return days.length > 0;
      },
      message: 'At least one day of the week must be selected.',
    },
  },
  timeSlots: {
    type: [String],
    enum: ["All Times During Shift Category", "Custom time range", "Specific time slot"],
    required: true
  },
  shiftCategories: {
    type: [String],
    enum: ["All Lunch Shift", "All Dinner Shifts", "Specific time slot"],
    required: false,
  },
  firstReservation: {
    type: String,
  },
  lastReservation: {
    type: String,
  },
  specificTime: {
    type: [String],
  },
  restrictShiftCategory: {
    type: Boolean,
    required: false
  },
  partySize: {
    type: partySizeSchema,
  },
  seatingAreas: {
    type: seatingAreaSchema,
    required: false,
  },
  guestFacingDisplay: guestFacingSchema,
  paymentPolicy: paymentPolicySchema,
  bookingChannels: [bookingChannels],
  selectableUpgrade: {
    doNotInclude: Boolean,
    include: Boolean,
  },
  reservationTags: {
    type: [String]
  },
  bookingWindow: { 
    type: bookingWindowSchema
  },

  maxReservationOrCoverLimit: {
    type: maxReservationOrCoverLimitSchema
  },

  pacing: {
    maxCoversPerSeatingInterval: { type: Number, default: 0 },
    customPacingPerSeatingInterval: [customPacingPerSeatingIntervalSchema],
    totalPacingReduction: { type: Boolean },
  },
  guestDurationPicker: {
    guestMustSpecifyDuration: { type: Boolean, default: false },
    durationMin: { type: Number, default: 0 },
    durationMax: { type: Number, default: 60 },
  },
});

// Define the AccessRule model using the schema
const AccessRule: Model<IAccessRuleDocument> = mongoose.model('AccessRule', accessRuleSchema);

export default AccessRule;