// Express API request populate the Room Model
export class SeatingAreaModel {
  constructor(
    public abbreviation: string = "",
    public seatingAreaName: string = "",
    public tables: string[] = [],
    public listOrder: number = 0,
    public outletId: string | { _id: string } | undefined,
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined
  ) {}
}

// Room Entity provided by Seating Repository is converted to Express API Response
export class SeatingAreaEntity {
  constructor(
    public _id: string | undefined = undefined,
    public abbreviation: string,
    public seatingAreaName: string,
    public tables: string[] = [],
    public listOrder: number,
    public outletId: string | { _id: string },
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined
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
        tables:
          seatingAreaData.tables !== undefined
            ? seatingAreaData.tables
            : existingSeatingArea.tables,
        listOrder:
          seatingAreaData.listOrder !== undefined
            ? seatingAreaData.listOrder
            : existingSeatingArea.listOrder,
        outletId:
          seatingAreaData.outletId !== undefined
            ? { _id: seatingAreaData.outletId }
            : existingSeatingArea.outletId,
        updatedBy:
          seatingAreaData.updatedBy !== undefined
            ? { _id: seatingAreaData.updatedBy }
            : existingSeatingArea.updatedBy,
        createdBy:
          seatingAreaData.createdBy !== undefined
            ? { _id: seatingAreaData.createdBy }
            : existingSeatingArea.createdBy,
      };
    } else {
      const seatingAreaEntity: SeatingAreaEntity = {
        _id: includeId
          ? seatingAreaData._id
            ? seatingAreaData._id.toString()
            : undefined
          : seatingAreaData._id.toString(),
        abbreviation: seatingAreaData.abbreviation,
        seatingAreaName: seatingAreaData.seatingAreaName,
        tables: seatingAreaData.tables,
        listOrder: seatingAreaData.listOrder,
        outletId: { _id: seatingAreaData.outletId },
        updatedBy: { _id: seatingAreaData.updatedBy },
        createdBy: { _id: seatingAreaData.createdBy },
      };
      return seatingAreaEntity;
    }
  }

  static toModel(seatingArea: SeatingAreaEntity): SeatingAreaModel {
    return {
      abbreviation: seatingArea.abbreviation,
      seatingAreaName: seatingArea.seatingAreaName,
      tables: seatingArea.tables,
      listOrder: seatingArea.listOrder,
      outletId: seatingArea.outletId,
      createdBy: seatingArea.updatedBy,
      updatedBy: seatingArea.createdBy,
    };
  }
}
