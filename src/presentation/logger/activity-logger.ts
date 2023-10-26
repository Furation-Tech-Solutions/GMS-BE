

import { LogModel } from '@data/logger/models/logger-model';
import env from '@main/config/env';
import { createLogger, format, transports } from 'winston'
import dotenv from 'dotenv'

dotenv.config();

const { combine, timestamp, printf } = format;

import { MongoDB } from 'winston-mongodb'

const myFormat = printf(({ level, message, timestamp }: {level:string, message:string, timestamp:string}) => {
    return ` [${level}] ${timestamp} : ${message}`;
});

export const ReservationLogger = (): any => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp({format: "HH:mm:ss"}),
            myFormat
          ),
        transports: [
          // new transports.Console(),
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




