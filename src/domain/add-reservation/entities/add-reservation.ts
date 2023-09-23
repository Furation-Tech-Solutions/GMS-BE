export class AddReservationModel {
  constructor(
    public date: string = "",
    public noOfGuests: Number = 1,
    public shift: string | undefined = undefined,
    public duration: string = "",
    public seatingArea: string | undefined = undefined,
    public timeSlot: string = "",
    public client: string | undefined = undefined,
    // public source: string | undefined = undefined,
    public reservationTags: string[] = [],
    public reservationNote: string = "",
    public table: string | undefined = undefined,
    public bookedBy: string | undefined = undefined,
    public perks: string = "",
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public confirmationMailSending: boolean = false
  ) {}
}

export class AddReservationEntity {
  constructor(
    public id: string | undefined = undefined,
    public date: string,
    public noOfGuests: Number,
    public shift: string | undefined,
    public duration: string,
    public seatingArea: string | undefined,
    public timeSlot: string,
    public client: string | undefined,
    // public client: string | undefined,
    // public source: string | undefined,
    public reservationTags: string[],
    public reservationNote: string,
    public table: string | undefined,
    public bookedBy: string | undefined,
    public perks: string,
    public updatedBy: string | { _id: string } | undefined,
    public createdBy: string | { _id: string } | undefined,
    public confirmationMailSending: boolean,
    public createdAt: string
  ) {}
}

export class AddReservationMapper {
  static toEntity(
    reservationData: any,
    includeId?: boolean,
    existingReservation?: AddReservationEntity
  ): AddReservationEntity {
    if (existingReservation != null) {
      return {
        ...existingReservation,
        date:
          reservationData.date !== undefined
            ? reservationData.date
            : existingReservation.date,
        noOfGuests:
          reservationData.noOfGuests !== undefined
            ? reservationData.noOfGuests
            : existingReservation.noOfGuests,
        shift:
          reservationData.shift !== undefined
            ? reservationData.shift
            : existingReservation.shift,
        duration:
          reservationData.duration !== undefined
            ? reservationData.duration
            : existingReservation.duration,
        seatingArea:
          reservationData.seatingArea !== undefined
            ? reservationData.seatingArea
            : existingReservation.seatingArea,
        timeSlot:
          reservationData.timeSlot !== undefined
            ? reservationData.timeSlot
            : existingReservation.timeSlot,
        // client:
        //   reservationData.client !== undefined
        //     ? reservationData.client
        //     : existingReservation.client,
        client:
          reservationData.client !== undefined
            ? reservationData.client
            : existingReservation.client,
        // source:
        // reservationData.source !== undefined
        // ? reservationData.source
        // : existingReservation.source,
        reservationTags:
          reservationData.reservationTags !== undefined
            ? reservationData.reservationTags
            : existingReservation.reservationTags,
        reservationNote:
          reservationData.reservationNote !== undefined
            ? reservationData.reservationNote
            : existingReservation.reservationNote,
        table:
          reservationData.table !== undefined
            ? reservationData.table
            : existingReservation.table,
        bookedBy:
          reservationData.bookedBy !== undefined
            ? reservationData.bookedBy
            : existingReservation.bookedBy,
        perks:
          reservationData.perks !== undefined
            ? reservationData.perks
            : existingReservation.perks,
        confirmationMailSending:
          reservationData.confirmationMailSending !== undefined
            ? reservationData.confirmationMailSending
            : existingReservation.confirmationMailSending,
        updatedBy:
          reservationData.updatedBy !== undefined
            ? { _id: reservationData.updatedBy }
            : existingReservation.updatedBy,
        createdBy:
          reservationData.createdBy !== undefined
            ? { _id: reservationData.createdBy }
            : existingReservation.createdBy,
        createdAt:
          reservationData.createdAt !== undefined
            ? reservationData.createdAt
            : existingReservation.createdAt,
      };
    } else {
      const reservationEntity: AddReservationEntity = {
        id: includeId
          ? reservationData._id
            ? reservationData._id.toString()
            : undefined
          : reservationData._id.toString(),
        date: reservationData.date,
        noOfGuests: reservationData.noOfGuests,
        shift: reservationData.shift,
        duration: reservationData.duration,
        seatingArea: reservationData.seatingArea,
        timeSlot: reservationData.timeSlot,
        // client: reservationData.client,
        client:
          reservationData.client !== undefined
            ? reservationData.client
            : undefined,
        // // source: reservationData.source,
        reservationTags: reservationData.reservationTags,
        reservationNote: reservationData.reservationNote,
        table: reservationData.table,
        bookedBy: reservationData.bookedBy,
        updatedBy: { _id: reservationData.updatedBy },
        createdBy: { _id: reservationData.createdBy },
        perks: reservationData.perks,
        confirmationMailSending: reservationData.confirmationMailSending,
        createdAt: reservationData.createdAt, // Make sure to create a new Date instance.
      };
      return reservationEntity;
    }
  }

  static toModel(reservation: AddReservationEntity): AddReservationModel {
    return new AddReservationModel(
      reservation.date,
      reservation.noOfGuests,
      reservation.shift,
      reservation.duration,
      reservation.seatingArea,
      reservation.timeSlot,
      reservation.client,
      // reservation.client?.id,
      // reservation.source,
      reservation.reservationTags,
      reservation.reservationNote,
      reservation.table,
      reservation.bookedBy,
      reservation.perks,
      reservation.updatedBy,
      reservation.createdBy,
      reservation.confirmationMailSending
    );
  }
}
