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
    public reservationStatus: string,
    public table: string[] | [] = [],
    public bookedBy: string | undefined,
    public serverName: string | undefined,
    public perks: string = "",
    public prePayment: number | undefined = 0,
    public onSitePayment: number | undefined = 0,
    public outletId: string | { _id: string } | undefined = undefined,
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public confirmationMailSending: boolean = false
  ) {}
}

export class AddReservationEntity {
  constructor(
    public _id: string | undefined = undefined,
    public date: string,
    public noOfGuests: Number,
    public shift: string | undefined,
    public duration: string,
    public seatingArea: string | undefined,
    public timeSlot: string,
    public client: string | undefined,
    // public source: string | undefined,
    public reservationTags: string[],
    public reservationNote: string,
    public reservationStatus: string,
    public table: string[] | [],
    public bookedBy: string = "",
    public serverName: string = "",
    public perks: string,
    public prePayment: number = 0,
    public onSitePayment: number = 0,
    public outletId: string | { _id: string },
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
        reservationStatus:
          reservationData.reservationStatus !== undefined
            ? reservationData.reservationStatus.toUpperCase()
            : existingReservation.reservationStatus.toUpperCase(),
        table:
          reservationData.table !== undefined
            ? reservationData.table
            : existingReservation.table,
        // bookedBy: reservationData.perks ?? existingReservation.perks,
        bookedBy:
          reservationData.bookedBy !== undefined
            ? reservationData.bookedBy
            : existingReservation.bookedBy,
        serverName:
          reservationData.serverName !== undefined
            ? reservationData.serverName
            : existingReservation.serverName,
        perks:
          reservationData.perks !== undefined
            ? reservationData.perks
            : existingReservation.perks,
        prePayment:
          reservationData.prePayment !== undefined
            ? reservationData.prePayment
            : existingReservation.prePayment,
        onSitePayment:
          reservationData.onSitePayment !== undefined
            ? reservationData.onSitePayment
            : existingReservation.onSitePayment,
        confirmationMailSending:
          reservationData.confirmationMailSending !== undefined
            ? reservationData.confirmationMailSending
            : existingReservation.confirmationMailSending,
        outletId:
          reservationData.outletId !== undefined
            ? { _id: reservationData.outletId }
            : existingReservation.outletId,
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
        _id: includeId
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
        client:
          reservationData.client !== undefined
            ? reservationData.client
            : undefined,
        // // source: reservationData.source,
        reservationTags: reservationData.reservationTags,
        reservationNote: reservationData.reservationNote,
        reservationStatus: reservationData.reservationStatus.toUpperCase(),
        table: reservationData.table,
        bookedBy: reservationData.bookedBy,
        serverName: reservationData.serverName,
        updatedBy: { _id: reservationData.updatedBy },
        createdBy: { _id: reservationData.createdBy },
        perks: reservationData.perks,
        prePayment: reservationData.prePayment,
        onSitePayment: reservationData.onSitePayment,
        confirmationMailSending: reservationData.confirmationMailSending,
        outletId: { _id: reservationData.outletId },
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
      // reservation.source,
      reservation.reservationTags,
      reservation.reservationNote,
      reservation.reservationStatus,
      reservation.table,
      reservation.bookedBy,
      reservation.serverName,
      reservation.perks,
      reservation.prePayment,
      reservation.onSitePayment,
      reservation.outletId,
      reservation.updatedBy,
      reservation.createdBy,
      reservation.confirmationMailSending
    );
  }
}
