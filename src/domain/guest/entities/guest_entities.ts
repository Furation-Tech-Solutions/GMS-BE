// Express API request populate the Guest Model
export class GuestModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public confirmationMailSending: boolean,
    public additionalGuest: string[],
    public reservationTags: string[],
    public notes: string = "",
    public bookedBy: string | { _id: string } = "",
    public status: string = "",
    public updatedBy: string | undefined = undefined,
    public createdBy: string | undefined = undefined,
    public createdAt: string
  ) {}
}
// add to the guestModel
// public bookedBy: string = "",

// Guest Entity provided by Guest Repository is converted to Express API Response
export class GuestEntity {
  constructor(
    public _id: string | undefined = undefined, // Set a default value for id
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public confirmationMailSending: boolean,
    public additionalGuest: string[],
    public reservationTags: string[],
    public notes: string = "",
    public bookedBy: string | { _id: string },
    public status: string = "",
    public updatedBy: string | undefined = undefined,
    public createdBy: string | undefined = undefined,
    public createdAt: string
  ) {}
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
          guestData.email !== undefined ? guestData.email : existingguest.email,
        confirmationMailSending:
          guestData.confirmationMailSending !== undefined
            ? guestData.confirmationMailSending
            : existingguest.confirmationMailSending,
        bookedBy:
          guestData.bookedBy !== undefined
            ? { _id: guestData.bookedBy }
            : existingguest.bookedBy,
        additionalGuest:
          guestData.aditionalGuest !== undefined
            ? guestData.additionalGuest
            : existingguest.additionalGuest,
        reservationTags:
          guestData.reservationTags !== undefined
            ? guestData.reservationTags
            : existingguest.reservationTags,
        notes:
          guestData.notes !== undefined ? guestData.notes : existingguest.notes,
        status:
          guestData.status !== undefined
            ? guestData.status
            : existingguest.status,
        updatedBy:
          guestData.updatedBy !== undefined
            ? guestData.updatedBy
            : existingguest.updatedBy,
        createdBy:
          guestData.createdBy !== undefined
            ? guestData.createdBy
            : existingguest.createdBy,
        createdAt:
          guestData.createdAt !== undefined
            ? guestData.createdAt
            : existingguest.createdAt,
      };
    } else {
      // If existingGuest is not provided, create a new GuestEntity using guestData
      const guestEntity: GuestEntity = {
        _id: includeId
          ? guestData._id
            ? guestData._id.toString()
            : undefined
          : guestData._id.toString(),
        firstName: guestData.firstName,
        lastName: guestData.lastName,
        email: guestData.email,
        confirmationMailSending: guestData.confirmationMailSending,
        bookedBy: { _id: guestData.bookedBy },
        additionalGuest: guestData.additionalGuest,
        reservationTags: guestData.reservationTags,
        notes: guestData.notes,
        status: guestData.status,
        updatedBy: guestData.updatedBy,
        createdBy: guestData.createdBy,
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
      confirmationMailSending: guest.confirmationMailSending,
      bookedBy: guest.bookedBy,
      additionalGuest: guest.additionalGuest,
      reservationTags: guest.reservationTags,
      notes: guest.notes,
      status: guest.status,
      updatedBy: guest.updatedBy,
      createdBy: guest.createdBy,
    };
  }
}
