// // Express API request to populate the BookedByName Model
// export class LoggerModel {
//     constructor(
//       public level: string = "",
//       public timestamp: string = "",
//       public message: string = "",
//       public client: string | { _id: string } | undefined,
//       public reservation: string | { _id: string } | undefined
//     ) {}
//   }
  
//   // BookedByName Entity provided by BookedByName Repository is converted to Express API Response
//   export class LoggerEntity {
//     constructor(
//       public _id: string | undefined = undefined,
//       public level: string ,
//       public timestamp: string ,
//       public message: string ,
//       public client: string | { _id: string } | undefined,
//       public reservation: string | { _id: string } | undefined
//     ) {}
//   }
  
//   export class BookedByNameMapper {
//     static toEntity(
//       LoggerData: any,
//       includeId?: boolean,
//       existingLoggerData?: LoggerEntity | null
//     ): LoggerEntity {
//       if (existingLoggerData != null) {
//         return {
//           ...existingLoggerData,
//         level:
//           LoggerData.level !== undefined
//               ? LoggerData.level
//               : existingLoggerData.level,
//         timestamp:
//           LoggerData.timestamp !== undefined
//               ? { _id: LoggerData.timestamp }
//               : existingLoggerData.timestamp,
//           updatedBy:
//           LoggerData.updatedBy !== undefined
//               ? { _id: LoggerData.updatedBy }
//               : existingBookedByName.updatedBy,
//           createdBy:
//           LoggerData.createdBy !== undefined
//               ? { _id: LoggerData.createdBy }
//               : existingBookedByName.createdBy,
//         };
//       } else {
//         const bookedByNameEntity: BookedByNameEntity = {
//           _id: includeId
//             ? bookedByNameData._id
//               ? bookedByNameData._id.toString()
//               : undefined
//             : bookedByNameData._id.toString(),
//           name: bookedByNameData.name,
//           outletId: {_id: bookedByNameData.outletId},
//           updatedBy: { _id: bookedByNameData.updatedBy },
//           createdBy: { _id: bookedByNameData.createdBy },
//         };
//         return bookedByNameEntity;
//       }
//     }
  
//     static toModel(bookedByName: BookedByNameEntity): BookedByNameModel {
//       return {
//         name: bookedByName.name,
//         outletId: bookedByName.outletId,
//         updatedBy: bookedByName.updatedBy,
//         createdBy: bookedByName.createdBy,
//       };
//     }
//   }
  