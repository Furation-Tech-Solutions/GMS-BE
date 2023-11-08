// Express API request to populate the BookedByName Model
export class BookedByNameModel {
  constructor(
    public name: string = "",
    public outletId: string | { _id: string } | undefined = "",
    public updatedBy: string | { _id: string } | undefined,
    public createdBy: string | { _id: string } | undefined
  ) {}
}

// BookedByName Entity provided by BookedByName Repository is converted to Express API Response
export class BookedByNameEntity {
  constructor(
    public _id: string | undefined = undefined,
    public name: string,
    public outletId: string | { _id: string } | undefined ,
    public updatedBy: string | { _id: string } | undefined,
    public createdBy: string | { _id: string } | undefined
  ) {}
}

export class BookedByNameMapper {
  static toEntity(
    bookedByNameData: any,
    includeId?: boolean,
    existingBookedByName?: BookedByNameEntity | null
  ): BookedByNameEntity {
    if (existingBookedByName != null) {
      return {
        ...existingBookedByName,
        name:
          bookedByNameData.name !== undefined
            ? bookedByNameData.name
            : existingBookedByName.name,
        outletId:
          bookedByNameData.outletId !== undefined
            ? { _id: bookedByNameData.outletId }
            : existingBookedByName.outletId,
        updatedBy:
          bookedByNameData.updatedBy !== undefined
            ? { _id: bookedByNameData.updatedBy }
            : existingBookedByName.updatedBy,
        createdBy:
          bookedByNameData.createdBy !== undefined
            ? { _id: bookedByNameData.createdBy }
            : existingBookedByName.createdBy,
      };
    } else {
      const bookedByNameEntity: BookedByNameEntity = {
        _id: includeId
          ? bookedByNameData._id
            ? bookedByNameData._id.toString()
            : undefined
          : bookedByNameData._id.toString(),
        name: bookedByNameData.name,
        outletId: bookedByNameData.outletId,
        updatedBy: { _id: bookedByNameData.updatedBy },
        createdBy: { _id: bookedByNameData.createdBy },
      };
      return bookedByNameEntity;
    }
  }

  static toModel(bookedByName: BookedByNameEntity): BookedByNameModel {
    return {
      name: bookedByName.name,
      outletId: bookedByName.outletId,
      updatedBy: bookedByName.updatedBy,
      createdBy: bookedByName.createdBy,
    };
  }
}
