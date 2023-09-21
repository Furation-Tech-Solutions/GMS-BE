import mongoose, {  Schema, Model } from 'mongoose';
import { IProgramSchedule } from 'types/availibility/daily-program-type';

// Define the possible shift values
const shiftsEnum: string[] = ["Breakfast", "Brunch", "Lunch", "Day", "Dinner", "Night"];


const programScheduleSchema: Schema<IProgramSchedule> = new Schema<IProgramSchedule>({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
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
  shifts: {
    type: [String],
    enum: shiftsEnum,
    required: true,
  },
  cuisine: {
    type: String,
  },
  pricePoint: {
    type: String,
  },
  description: {
    type: String,
  },
  dressCode: {
    type: String,
  },
  tableHoldingPolicy: {
    type: String,
  },
  spendPolicy: {
    type: String,
  },
  childPolicy: {
    type: String,
  },
});

// Create the Mongoose model
const ProgramSchedule: Model<IProgramSchedule> = mongoose.model<IProgramSchedule>('ProgramSchedule', programScheduleSchema);

export default ProgramSchedule;
