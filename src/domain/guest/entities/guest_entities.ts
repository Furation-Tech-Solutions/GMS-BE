// // Express API request populate the Guest Model
// export class GuestModel {
//   constructor(
//     public firstName: string = "",
//     public lastName: string = "",
//     public email: string = "",
//     public confirmationMailSending: boolean,
//     public additionalGuest: string[],
//     public reservationTags: string[],
//     public notes: string = "",
//     public bookedBy: { _id: string; name: string },
//     public status: string = "",
//     public updatedBy: string | undefined = undefined,
//     public createdBy: string | undefined = undefined,
//     public createdAt: string
//   ) {}
// }
// // add to the guestModel
// // public bookedBy: string = "",

// // Guest Entity provided by Guest Repository is converted to Express API Response
// export class GuestEntity {
//   constructor(
//     public _id: string | undefined = undefined, // Set a default value for id
//     public firstName: string = "",
//     public lastName: string = "",
//     public email: string = "",
//     public confirmationMailSending: boolean,
//     public additionalGuest: string[],
//     public reservationTags: string[],
//     public notes: string = "",
//     public bookedBy: { _id: string; name: string },
//     public status: string = "",
//     public updatedBy: string | undefined = undefined,
//     public createdBy: string | undefined = undefined,
//     public createdAt: string
//   ) {}
// }

// // add to the GuestEntity
// // public bookedBy: string = "",

// /* ================================================= */
// export class GuestMapper {
//   static toEntity(
//     guestData: any,
//     includeId?: boolean,
//     existingguest?: GuestEntity
//   ): GuestEntity {
//     if (existingguest != null) {
//       // If existingguest is provided, merge the data from guestData with the existingguest
//       return {
//         ...existingguest,
//         firstName:
//           guestData.firstName !== undefined
//             ? guestData.firstName
//             : existingguest.firstName,
//         lastName:
//           guestData.lastName !== undefined
//             ? guestData.lastName
//             : existingguest.lastName,
//         email:
//           guestData.email !== undefined ? guestData.email : existingguest.email,
//         confirmationMailSending:
//           guestData.confirmationMailSending !== undefined
//             ? guestData.confirmationMailSending
//             : existingguest.confirmationMailSending,
//         bookedBy:
//           guestData.bookedBy !== undefined
//             ? { _id: guestData.bookedBy }
//             : existingguest.bookedBy,
//         additionalGuest:
//           guestData.aditionalGuest !== undefined
//             ? guestData.additionalGuest
//             : existingguest.additionalGuest,
//         reservationTags:
//           guestData.reservationTags !== undefined
//             ? guestData.reservationTags
//             : existingguest.reservationTags,
//         notes:
//           guestData.notes !== undefined ? guestData.notes : existingguest.notes,
//         status:
//           guestData.status !== undefined
//             ? guestData.status
//             : existingguest.status,
//         updatedBy:
//           guestData.updatedBy !== undefined
//             ? guestData.updatedBy
//             : existingguest.updatedBy,
//         createdBy:
//           guestData.createdBy !== undefined
//             ? guestData.createdBy
//             : existingguest.createdBy,
//         createdAt:
//           guestData.createdAt !== undefined
//             ? guestData.createdAt
//             : existingguest.createdAt,
//       };
//     } else {
//       // If existingGuest is not provided, create a new GuestEntity using guestData
//       const guestEntity: GuestEntity = {
//         _id: includeId
//           ? guestData._id
//             ? guestData._id.toString()
//             : undefined
//           : guestData._id.toString(),
//         firstName: guestData.firstName,
//         lastName: guestData.lastName,
//         email: guestData.email,
//         confirmationMailSending: guestData.confirmationMailSending,
//         bookedBy: { _id: guestData.bookedBy },
//         additionalGuest: guestData.additionalGuest,
//         reservationTags: guestData.reservationTags,
//         notes: guestData.notes,
//         status: guestData.status,
//         updatedBy: guestData.updatedBy,
//         createdBy: guestData.createdBy,
//         createdAt: guestData.createdAt,
//       };
//       return guestEntity;
//     }
//   }
//   static toModel(guest: GuestEntity): any {
//     // console.log(guest.aditionalGuest);
//     return {
//       firstName: guest.firstName,
//       lastName: guest.lastName,
//       email: guest.email,
//       confirmationMailSending: guest.confirmationMailSending,
//       bookedBy: guest.bookedBy,
//       additionalGuest: guest.additionalGuest,
//       reservationTags: guest.reservationTags,
//       notes: guest.notes,
//       status: guest.status,
//       updatedBy: guest.updatedBy,
//       createdBy: guest.createdBy,
//     };
//   }
// }

// GuestModel
export class GuestModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public confirmationMailSending: boolean = false, // Add a default value
    public additionalGuest: string[] = [],
    public reservationTags: string[] = [],
    public notes: string = "",
    public bookedBy: { _id: string; name: string } = { _id: "", name: "" }, // Provide default values
    public status: string = "",
    public updatedBy: string | { _id: string } | undefined,
    public createdBy: string | { _id: string } | undefined,
    public createdAt: string
  ) {}
}

// GuestEntity
export class GuestEntity {
  constructor(
    public _id: string | undefined = undefined,
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public confirmationMailSending: boolean = false,
    public additionalGuest: string[] = [],
    public reservationTags: string[] = [],
    public notes: string = "",
    public bookedBy: { _id: string; name: string } = { _id: "", name: "" },
    public status: string = "",
    public updatedBy: string | { _id: string } | undefined,
    public createdBy: string | { _id: string } | undefined,
    public createdAt: string
  ) {}
}

// GuestMapper
export class GuestMapper {
  static toEntity(
    guestData: any,
    includeId?: boolean,
    existingguest?: GuestEntity
  ): GuestEntity {
    if (existingguest != null) {
      // Merge the data from guestData with the existingguest
      return {
        ...existingguest,
        _id: includeId ? guestData._id : existingguest._id,
        firstName: guestData.firstName ?? existingguest.firstName,
        lastName: guestData.lastName ?? existingguest.lastName,
        email: guestData.email ?? existingguest.email,
        confirmationMailSending:
          guestData.confirmationMailSending ??
          existingguest.confirmationMailSending,
        bookedBy: guestData.bookedBy ?? existingguest.bookedBy,
        additionalGuest:
          guestData.additionalGuest ?? existingguest.additionalGuest,
        reservationTags:
          guestData.reservationTags ?? existingguest.reservationTags,
        notes: guestData.notes ?? existingguest.notes,
        status: guestData.status ?? existingguest.status,
        updatedBy:
          guestData.updatedBy !== undefined
            ? { _id: guestData.updatedBy }
            : existingguest.updatedBy,
        createdBy:
          guestData.createdBy !== undefined
            ? { _id: guestData.createdBy }
            : existingguest.createdBy,
        createdAt: guestData.createdAt ?? existingguest.createdAt,
      };
    } else {
      // Create a new GuestEntity using guestData
      return new GuestEntity(
        // _id: includeId
        // ? clientData._id
        //   ? clientData._id.toString()
        //   : undefined
        // : clientData._id.toString(),
        includeId ? guestData._id.toString() : guestData._id.toString(),
        guestData.firstName,
        guestData.lastName,
        guestData.email,
        guestData.confirmationMailSending,
        guestData.additionalGuest,
        guestData.reservationTags,
        guestData.notes,
        guestData.bookedBy,
        guestData.status,
        { _id: guestData.updatedBy },
        { _id: guestData.createdBy },
        guestData.createdAt
      );
    }
  }

  static toModel(guest: GuestEntity): any {
    return {
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      confirmationMailSending: guest.confirmationMailSending,
      bookedBy: guest.bookedBy,
      additionalGuest: guest.additionalGuest,
      reservationTags: guest.reservationTags,
      notes: guest.notes,
      status: guest.status,
      updatedBy: guest.updatedBy,
      createdBy: guest.createdBy,
      createdAt: guest.createdAt,
    };
  }
}
