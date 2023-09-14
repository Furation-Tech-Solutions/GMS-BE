// Express API request populate the ReservationTagCategoryModel
export class ReservationTagCategoryModel {
  constructor(
    public name: string = "",
    public color: string = "",
    public classification: object = {},
    public vip: boolean = false,
    public display: object = {},
    public followers: string[] = [],
    public tags: string[] = [],
    public createdAt: Date
  ) { }
}

// ReservationTagCategoryEntity provided by ReservationTagCategory Repository is converted to Express API Response
export class ReservationTagCategoryEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string = "",
    public color: string = "",
    public classification: object = {},
    public vip: boolean = false,
    public display: object = {},
    public followers: string[] = [],
    public tags: string[] = [],
    public createdAt: Date
  ) { }
}

/* ================================================= */
export class ReservationTagCategoryMapper {
  static toEntity(
    reservationTagCategoryData: any,
    includeId?: boolean,
    existingReservationTagCategory?: ReservationTagCategoryEntity
  ): ReservationTagCategoryEntity {
    if (existingReservationTagCategory != null) {
      return {
        ...existingReservationTagCategory,
        name: reservationTagCategoryData.name !== undefined ? reservationTagCategoryData.name : existingReservationTagCategory.name,
        color: reservationTagCategoryData.color !== undefined ? reservationTagCategoryData.color : existingReservationTagCategory.color,
        classification: reservationTagCategoryData.classification !== undefined ? reservationTagCategoryData.classification : existingReservationTagCategory.classification,
        vip: reservationTagCategoryData.vip !== undefined ? reservationTagCategoryData.vip : existingReservationTagCategory.vip,
        display: reservationTagCategoryData.display !== undefined ? reservationTagCategoryData.display : existingReservationTagCategory.display,
        followers: reservationTagCategoryData.followers !== undefined ? reservationTagCategoryData.followers : existingReservationTagCategory.followers,
        tags: reservationTagCategoryData.tags !== undefined ? reservationTagCategoryData.tags : existingReservationTagCategory.tags,
        createdAt: reservationTagCategoryData.createdAt !== undefined ? reservationTagCategoryData.createdAt : existingReservationTagCategory.createdAt,
      };
    } else {
      const reservationTagCategoryEntity: ReservationTagCategoryEntity = {
        id: includeId ? (reservationTagCategoryData._id ? reservationTagCategoryData._id.toString() : undefined) : reservationTagCategoryData._id.toString(),
        name: reservationTagCategoryData.name,
        color: reservationTagCategoryData.color,
        classification: reservationTagCategoryData.classification,
        vip: reservationTagCategoryData.vip,
        display: reservationTagCategoryData.display,
        followers: reservationTagCategoryData.followers,
        tags: reservationTagCategoryData.tags,
        createdAt: reservationTagCategoryData.createdAt,
      };
      return reservationTagCategoryData;
    }
  }

  static toModel(reservationTagCategory: ReservationTagCategoryEntity): any {
    return {
      name: reservationTagCategory.name,
      color: reservationTagCategory.color,
      classification: reservationTagCategory.classification,
      vip: reservationTagCategory.vip,
      display: reservationTagCategory.display,
      followers: reservationTagCategory.followers,
      tags: reservationTagCategory.tags,
      createdAt: reservationTagCategory.createdAt,
    };
  }
}
