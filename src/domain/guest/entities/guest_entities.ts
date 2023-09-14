// Express API request populate the Guest Model
export class GuestModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public phone: string = "",
    public confirmationMailSending: boolean,
    public aditionalGuest: string[],
    public reservationTags: string[],
    public notes: string = "",
    public createdAt: string
  ) { }
}
// add to the guestModel 
// public bookedBy: string = "",

// Guest Entity provided by Guest Repository is converted to Express API Response
export class GuestEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public phone: string = "",
    public confirmationMailSending: boolean,
    public aditionalGuest: string[],
    public reservationTags: string[],
    public notes: string = "",
    public createdAt: string
  ) { }
}

// add to the GuestEntity 
// public bookedBy: string = "",

/* ================================================= */
export class GuestMapper {
  static toEntity(
    guestData: any,
    includeId?: boolean,
    existingguest?: GuestEntity
  ): GuestEntity {
    if (existingguest != null) {
      // If existingguest is provided, merge the data from guestData with the existingguest
      return {
        ...existingguest,
        firstName:
          guestData.firstName !== undefined
            ? guestData.firstName
            : existingguest.firstName,
        lastName:
          guestData.lastName !== undefined
            ? guestData.lastName
            : existingguest.lastName,
        email:
          guestData.email !== undefined
            ? guestData.email
            : existingguest.email,
        phone:
          guestData.phone !== undefined
            ? guestData.phone
            : existingguest.phone,
        confirmationMailSending:
          guestData.confirmationMailSending !== undefined
            ? guestData.confirmationMailSending
            : existingguest.confirmationMailSending,
        // bookedBy:
        //   guestData.bookedBy !== undefined
        //     ? guestData.bookedBy
        //     : existingguest.bookedBy,
        aditionalGuest:
          guestData.aditionalGuest !== undefined
            ? guestData.aditionalGuest
            : existingguest.aditionalGuest,
        reservationTags:
          guestData.reservationTags !== undefined
            ? guestData.reservationTags
            : existingguest.reservationTags,
        notes:
          guestData.notes !== undefined
            ? guestData.notes
            : existingguest.notes,
        createdAt:
          guestData.createdAt !== undefined
            ? guestData.createdAt
            : existingguest.createdAt,
      };
    } else {
      // If existingGuest is not provided, create a new GuestEntity using guestData
      const guestEntity: GuestEntity = {
        id: includeId
          ? guestData._id
            ? guestData._id.toString()
            : undefined
          : guestData._id.toString(),
        firstName: guestData.firstName,
        lastName: guestData.lastName,
        email: guestData.email,
        phone: guestData.phone,
        confirmationMailSending:
          guestData.confirmationMailSending,
        // bookedBy: guestData.bookedBy,
        aditionalGuest: guestData.aditionalGuest,
        reservationTags: guestData.reservationTags,
        notes: guestData.notes,
        createdAt: guestData.createdAt,
      };
      return guestEntity;
    }
  }
  static toModel(guest: GuestEntity): any {
    // console.log(guest.aditionalGuest);
    return {
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      phone: guest.phone,
      confirmationMailSending: guest.confirmationMailSending,
      // bookedBy: guest.bookedBy,
      aditionalGuest: guest.aditionalGuest,
      reservationTags: guest.reservationTags,
      notes: guest.notes,
    };
  }
}
