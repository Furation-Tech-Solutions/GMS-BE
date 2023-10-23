

import { createLogger, format, transports } from 'winston'



const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }: {level:string, message:string, timestamp:string}) => {
    return ` [${level}] ${timestamp} : ${message}`;
});

export const itemsLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            myFormat
          ),
        transports: [
          new transports.Console(),
          new transports.File({ filename: 'error.log', level: 'error' }), // showing logs in error.log file
          new transports.File({ filename: 'combined.log' }), // showing logs in combined.log file
        ],
      });

}

