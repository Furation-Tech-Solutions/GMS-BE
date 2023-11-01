

import { LogModel } from '@data/logger/models/logger-model';
import env from '@main/config/env';
import { createLogger, format, transports } from 'winston'
import dotenv from 'dotenv'

dotenv.config();

const { combine, timestamp, printf, json } = format;

import { MongoDB } from 'winston-mongodb'

const myFormat = printf(({ level, message, timestamp, sessionId }: {level:string, message:string, timestamp:string, sessionId?: string}) => {
  const sessionIdInfo = sessionId ? `Session ID: ${sessionId}` : '';
  console.log('Session ID:', sessionId);
    return ` [${level}] ${timestamp} : ${message} ${sessionId}`;
});



export const ReservationLogger = (): any => {
    return createLogger({
        level: 'info',
        defaultMeta: { component: 'user-service' },
        format: combine(
            timestamp({format: "HH:mm:ss"}),
            myFormat
          ),
        transports: [
          new transports.Console(),
          new transports.File({ filename: 'error.log', level: 'error' }), // showing logs in error.log file
          new transports.File({ filename: 'combined.log' }), // showing logs in combined.log file
          new MongoDB({
            level: 'info', 
            db: `${process.env.MONGO_URL_WINSTON}`,
            collection: 'logs', 
            options:{
              useNewUrlParser: true,
              useUnifiedTopology: true,
            },
        }),
        ],
      }); 
}




