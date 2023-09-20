// Express API request populate the clientTagModel
export class ReservationTagModel {
  constructor(
    public name: string = "",
    public categoryNameId: string = "",
    public createdAt: Date
  ) { }
}

// client TagEntity provided by client Tag Repository is converted to Express API Response
export class ReservationTagEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string = "",
    public categoryNameId: string = "",
    public createdAt: Date
  ) { }
}

/* ================================================= */
export class ReservationTagMapper {
  static toEntity(
    reservationTagData: any,
    includeId?: boolean,
    existingReservationTag?: ReservationTagEntity
  ): ReservationTagEntity {
    if (existingReservationTag != null) {
      return {
        ...existingReservationTag,
        name: reservationTagData.name !== undefined ? reservationTagData.name : existingReservationTag.name,
        categoryNameId: reservationTagData.categoryNameId !== undefined ? reservationTagData.categoryNameId : existingReservationTag.categoryNameId,
        createdAt: reservationTagData.createdAt !== undefined ? reservationTagData.createdAt : existingReservationTag.createdAt,
      };
    } else {
      const ReservationTagEntity: ReservationTagEntity = {
        id: includeId ? (reservationTagData._id ? reservationTagData._id.toString() : undefined) : reservationTagData._id.toString(),
        name: reservationTagData.name,
        categoryNameId: reservationTagData.categoryNameId,
        createdAt: reservationTagData.createdAt,
      };
      return reservationTagData;
    }
  }

  static toModel(reservationTag: ReservationTagEntity): any {
    return {
      name: reservationTag.name,
      categoryNameId: reservationTag.categoryNameId,
      createdAt: reservationTag.createdAt,
    };
  }
}