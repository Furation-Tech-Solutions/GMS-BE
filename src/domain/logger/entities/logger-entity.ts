// Express API request to populate the BookedByName Model
export class LoggerModel {
    constructor(
      public level: string = "",
      public timestamp: string = "",
      public message: string = "",
      public client?: string | { _id: string } ,
      public reservation?: string | { _id: string },
    ) {}
  }
  
  // BookedByName Entity provided by BookedByName Repository is converted to Express API Response
  export class LoggerEntity {
    constructor(
      public _id: string | undefined = undefined,
      public level: string ,
      public timestamp: string ,
      public message: string ,
      public client?: string | { _id: string },
      public reservation?: string | { _id: string } 
    ) {}
  }
  
  export class LoggerMapper {
    static toEntity(
      LoggerData: any,
      includeId?: boolean,
      existingLoggerData?: LoggerEntity | null
    ): LoggerEntity {
      if (existingLoggerData != null) {
        return {
          ...existingLoggerData,
        level:
          LoggerData.level !== undefined
              ? LoggerData.level
              : existingLoggerData.level,
        timestamp:
          LoggerData.timestamp !== undefined
              ? LoggerData.timestamp 
              : existingLoggerData.timestamp,
        message:
          LoggerData.message !== undefined
              ? LoggerData.message 
              : existingLoggerData.message,
          client:
          LoggerData.client !== undefined
              ? { _id: LoggerData.client }
              : existingLoggerData.client,
          reservation:
          LoggerData.reservation !== undefined
              ? { _id: LoggerData.reservation }
              : existingLoggerData.reservation,
        };
      } else {
        const loggerEntity: LoggerEntity = {
          _id: includeId
            ? LoggerData._id
              ? LoggerData._id.toString()
              : undefined
            : LoggerData._id.toString(),
          level: LoggerData.level,
          timestamp: LoggerData.timestamp,
          message: LoggerData.message,
          client: {_id: LoggerData.client},
          reservation: { _id: LoggerData.reservation },
        };
        return loggerEntity;
      }
    }
  
    static toModel(LoggerData: LoggerEntity): LoggerModel {
      return {
        level: LoggerData.level,
          timestamp: LoggerData.timestamp,
          message: LoggerData.message,
          client:  LoggerData.client,
          reservation: LoggerData.reservation,
      }; 
    }
  }
  