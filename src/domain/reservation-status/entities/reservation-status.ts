// Express API request populate the Reservation Status Model
export class ReservationStatusModel {
  constructor(
    public statusName: string,
    public iconInitials: string,
    public color: string,
    public classification: string,
    public active: boolean | undefined,
    public durationHolds: number | undefined
  ) {}
}

// ReservationStatus Entity provided by ReservationStatus Repository is converted to Express API Response
export class ReservationStatusEntity {
  constructor(
    public id: string | undefined = undefined,
    public statusName: string,
    public iconInitials: string,
    public color: string,
    public classification: string,
    public active: boolean ,
    public durationHolds: number | undefined
  ) {}
}

export class ReservationStatusMapper {
  static toEntity(
    reservationStatusData: any,
    includeId?: boolean,
    existingReservationStatus?: ReservationStatusEntity
  ): ReservationStatusEntity {
    if (existingReservationStatus != null) {
      return {
        ...existingReservationStatus,
        statusName:
          reservationStatusData.statusName !== undefined
            ? reservationStatusData.statusName
            : existingReservationStatus.statusName,
        iconInitials:
          reservationStatusData.iconInitials !== undefined
            ? reservationStatusData.iconInitials
            : existingReservationStatus.iconInitials,
        color:
          reservationStatusData.color !== undefined
            ? reservationStatusData.color
            : existingReservationStatus.color,
        classification:
          reservationStatusData.classification !== undefined
            ? reservationStatusData.classification
            : existingReservationStatus.classification,
        active:
          reservationStatusData.active !== undefined
            ? reservationStatusData.active
            : existingReservationStatus.active,
        durationHolds:
          reservationStatusData.durationHolds !== undefined
            ? reservationStatusData.durationHolds
            : existingReservationStatus.durationHolds,
      };
    } else {
      const reservationStatusEntity: ReservationStatusEntity = {
        id: includeId
          ? reservationStatusData._id
            ? reservationStatusData._id.toString()
            : undefined
          : reservationStatusData._id.toString(),
        statusName: reservationStatusData.statusName,
        iconInitials: reservationStatusData.iconInitials,
        color: reservationStatusData.color,
        classification: reservationStatusData.classification,
        active: reservationStatusData.active,
        durationHolds: reservationStatusData.durationHolds,
      };
      return reservationStatusEntity;
    }
  }

  static toModel(
    reservationStatus: ReservationStatusEntity
  ): ReservationStatusModel {
    // Modify this function as per your RoomModel structure
    // You can create a ReservationStatusModel class or use a generic object
    return {
      statusName: reservationStatus.statusName,
      iconInitials: reservationStatus.iconInitials,
      color: reservationStatus.color,
      classification: reservationStatus.classification,
      active: reservationStatus.active,
      durationHolds: reservationStatus.durationHolds,
    };
  }
}
