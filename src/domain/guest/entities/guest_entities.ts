// Express API request populate the Guest Model
export class GuestModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public confirmationMailSending: boolean = false,
    public date: string = "",
    public additionalGuest: string[] = [],
    public reservationTags: string[] = [],
    public notes: string = "",
    public bookedBy: { _id: string; name: string } | undefined,
    public status: string = "",
    public outletId: string | undefined,
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public createdAt: string
  ) {}
}

// Guest Entity provided by Guest Repository is converted to Express API Response
export class GuestEntity {
  constructor(
    public _id: string | undefined = undefined,
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public confirmationMailSending: boolean = false,
    public date: string = "",
    public additionalGuest: string[] = [],
    public reservationTags: string[] = [],
    public notes: string = "",
    public bookedBy: { _id: string; name: string } | undefined,
    public status: string = "",
    public outletId: string ,
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public createdAt: string
  ) {}
}

/* ============ */

export class GuestMapper {
  static toEntity(
    guestData: any,
    includeId?: boolean,
    existingGuest?: GuestEntity
  ): GuestEntity {
    if (existingGuest != null) {
      return {
        ...existingGuest,
        firstName:
          guestData.firstName !== undefined
            ? guestData.firstName
            : existingGuest.firstName,
        lastName:
          guestData.lastName !== undefined
            ? guestData.lastName
            : existingGuest.lastName,
        email:
          guestData.email !== undefined ? guestData.email : existingGuest.email,
        confirmationMailSending:
          guestData.confirmationMailSending !== undefined
            ? guestData.confirmationMailSending
            : existingGuest.confirmationMailSending,
        date:
          guestData.date !== undefined ? guestData.date : existingGuest.date,
        bookedBy:
          guestData.bookedBy !== undefined
            ? guestData.bookedBy
            : existingGuest.bookedBy,
        additionalGuest:
          guestData.additionalGuest !== undefined
            ? guestData.additionalGuest
            : existingGuest.additionalGuest,
        reservationTags:
          guestData.reservationTags !== undefined
            ? guestData.reservationTags
            : existingGuest.reservationTags,
        notes:
          guestData.notes !== undefined ? guestData.notes : existingGuest.notes,
        status:
          guestData.status !== undefined
            ? guestData.status
            : existingGuest.status,
        outletId:
          guestData.outletId !== undefined
            ? guestData.outletId
            : existingGuest.outletId,
        updatedBy:
          guestData.updatedBy !== undefined
            ? { _id: guestData.updatedBy }
            : existingGuest.updatedBy,
        createdBy:
          guestData.createdBy !== undefined
            ? { _id: guestData.createdBy }
            : existingGuest.createdBy,
        createdAt:
          guestData.createdAt !== undefined
            ? guestData.createdAt
            : existingGuest.createdAt,
      };
    } else {
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
        date: guestData.date,
        bookedBy: guestData.bookedBy,
        additionalGuest: guestData.additionalGuest,
        reservationTags: guestData.reservationTags,
        notes: guestData.notes,
        status: guestData.status,
        outletId: guestData.outletId,
        updatedBy: { _id: guestData.updatedBy },
        createdBy: { _id: guestData.createdBy },
        createdAt: guestData.createdAt,
      };
      return guestEntity;
    }
  }

  static toModel(guest: GuestEntity): any {
    return {
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      confirmationMailSending: guest.confirmationMailSending,
      date: guest.date,
      bookedBy: guest.bookedBy,
      additionalGuest: guest.additionalGuest,
      reservationTags: guest.reservationTags,
      notes: guest.notes,
      status: guest.status,
      outletId: guest.outletId,
      updatedBy: guest.updatedBy,
      createdBy: guest.createdBy,
    };
  }
}
