// Express API request populate the Room Model
export class SeatingAreaModel {
  constructor(
    public abbreviation: string = "",
    public seatingAreaName: string = "",
    public listOrder: number = 0
  ) {}
}

// Room Entity provided by Seating Repository is converted to Express API Response
export class SeatingAreaEntity {
  constructor(
    public id: string | undefined = undefined,
    public abbreviation: string,
    public seatingAreaName: string,
    public listOrder: number
  ) {}
}

export class SeatingAreaMapper {
  static toEntity(
    seatingAreaData: any,
    includeId?: boolean,
    existingSeatingArea?: SeatingAreaEntity
  ): SeatingAreaEntity {
    if (existingSeatingArea != null) {
      return {
        ...existingSeatingArea,
        abbreviation:
          seatingAreaData.abbreviation !== undefined
            ? seatingAreaData.abbreviation
            : existingSeatingArea.abbreviation,
        seatingAreaName:
          seatingAreaData.seatingAreaName !== undefined
            ? seatingAreaData.seatingAreaName
            : existingSeatingArea.seatingAreaName,
        listOrder:
          seatingAreaData.listOrder !== undefined
            ? seatingAreaData.listOrder
            : existingSeatingArea.listOrder,
      };
    } else {
      const seatingAreaEntity: SeatingAreaEntity = {
        id: includeId
          ? seatingAreaData._id
            ? seatingAreaData._id.toString()
            : undefined
          : undefined,
        abbreviation: seatingAreaData.abbreviation,
        seatingAreaName: seatingAreaData.seatingAreaName,
        listOrder: seatingAreaData.listOrder,
      };
      return seatingAreaEntity;
    }
  }

  static toModel(seatingArea: SeatingAreaEntity): SeatingAreaModel {
    return {
      abbreviation: seatingArea.abbreviation,
      seatingAreaName: seatingArea.seatingAreaName,
      listOrder: seatingArea.listOrder,
    };
  }
}
