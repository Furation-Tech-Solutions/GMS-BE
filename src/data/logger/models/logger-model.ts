
import  mongoose, { Schema } from 'mongoose';
import { ILogger } from 'types/logger/logger-schema-type';



const logSchema: Schema<ILogger> = new mongoose.Schema({
  level: {
    type: String
  },
  message: {
    type: String
  },
  timestamp: {
    type: String
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    default: null
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddReservation",
    default: null
  }

});

export const LogModel = mongoose.model('Log', logSchema);
