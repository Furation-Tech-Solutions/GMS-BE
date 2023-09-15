// Express API request populate the Room Model
export class SeatingAreaModel {
  constructor(
    public abbreviation: string = "",
    public seatingAreaName: string = "",
    public listOrder: number = 0,
    public updatedBy: string | undefined = undefined,
    public createdBy: string | undefined = undefined
  ) {}
}

// Room Entity provided by Seating Repository is converted to Express API Response
export class SeatingAreaEntity {
  constructor(
    public id: string | undefined = undefined,
    public abbreviation: string,
    public seatingAreaName: string,
    public listOrder: number,
    public updatedBy: string | undefined ,
    public createdBy: string | undefined 
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
        createdBy:
          seatingAreaData.createdBy !== undefined
            ? seatingAreaData.createdBy
            : existingSeatingArea.createdBy,
        updatedBy:
          seatingAreaData.updatedBy !== undefined
            ? seatingAreaData.updatedBy
            : existingSeatingArea.updatedBy,
      };
    } else {
      const seatingAreaEntity: SeatingAreaEntity = {
        id: includeId
          ? seatingAreaData._id
            ? seatingAreaData._id.toString()
            : undefined
          : seatingAreaData._id.toString(),
        abbreviation: seatingAreaData.abbreviation,
        seatingAreaName: seatingAreaData.seatingAreaName,
        listOrder: seatingAreaData.listOrder,
        updatedBy: seatingAreaData.updatedBy,
        createdBy: seatingAreaData.createdBy,
      };
      return seatingAreaEntity;
    }
  }

  static toModel(seatingArea: SeatingAreaEntity): SeatingAreaModel {
    return {
      abbreviation: seatingArea.abbreviation,
      seatingAreaName: seatingArea.seatingAreaName,
      listOrder: seatingArea.listOrder,
      createdBy: seatingArea.updatedBy,
      updatedBy: seatingArea.createdBy,
    };
  }
}
