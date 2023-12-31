// Express API request populate the clientTagModel
export class ReservationTagModel {
  constructor(
    public name: string = "",
    public categoryNameId: string = "",
    public outletId: string | { _id: string } | undefined,
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public createdAt: Date
  ) {}
}

// client TagEntity provided by client Tag Repository is converted to Express API Response
export class ReservationTagEntity {
  constructor(
    public _id: string | undefined = undefined, // Set a default value for id
    public name: string = "",
    public categoryNameId: string = "",
    public outletId: string | { _id: string },
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public createdAt: Date
  ) {}
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
        name:
          reservationTagData.name !== undefined
            ? reservationTagData.name
            : existingReservationTag.name,
        categoryNameId:
          reservationTagData.categoryNameId !== undefined
            ? reservationTagData.categoryNameId
            : existingReservationTag.categoryNameId,
        outletId:
          reservationTagData.outletId !== undefined
            ? { _id: reservationTagData.outletId }
            : existingReservationTag.outletId,
        updatedBy:
          reservationTagData.updatedBy !== undefined
            ? { _id: reservationTagData.updatedBy }
            : existingReservationTag.updatedBy,
        createdBy:
          reservationTagData.createdBy !== undefined
            ? { _id: reservationTagData.createdBy }
            : existingReservationTag.createdBy,
        createdAt:
          reservationTagData.createdAt !== undefined
            ? reservationTagData.createdAt
            : existingReservationTag.createdAt,
      };
    } else {
      const ReservationTagEntity: ReservationTagEntity = {
        _id: includeId
          ? reservationTagData._id
            ? reservationTagData._id.toString()
            : undefined
          : reservationTagData._id.toString(),
        name: reservationTagData.name,
        categoryNameId: reservationTagData.categoryNameId,
        outletId: { _id: reservationTagData.outletId },
        updatedBy: { _id: reservationTagData.updatedBy },
        createdBy: { _id: reservationTagData.createdBy },
        createdAt: reservationTagData.createdAt,
      };
      return ReservationTagEntity;
    }
  }

  static toModel(reservationTag: ReservationTagEntity): any {
    return {
      name: reservationTag.name,
      categoryNameId: reservationTag.categoryNameId,
      outletId: reservationTag.outletId,
      updatedBy: reservationTag.updatedBy,
      createdBy: reservationTag.createdBy,
      createdAt: reservationTag.createdAt,
    };
  }
}
