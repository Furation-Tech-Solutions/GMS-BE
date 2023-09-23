// Express API request to populate the BookedByName Model
export class BookedByNameModel {
  constructor(
    public name: string = "",
    public updatedBy: string | {id: string} | undefined = undefined,
    public createdBy: string | {id: string} | undefined = undefined
  ) {}
}

// BookedByName Entity provided by BookedByName Repository is converted to Express API Response
export class BookedByNameEntity {
  constructor(
    public id: string | undefined = undefined,
    public name: string,
    public updatedBy: string | {id: string} | undefined,
    public createdBy: string | {id: string} | undefined
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
        updatedBy:
          bookedByNameData.updatedBy !== undefined
            ? {id:bookedByNameData.updatedBy}
            : existingBookedByName.updatedBy,
        createdBy:
          bookedByNameData.createdBy !== undefined
            ? {id: bookedByNameData.createdBy}
            : existingBookedByName.createdBy,
      };
    } else {
      const bookedByNameEntity: BookedByNameEntity = {
        id: includeId
          ? bookedByNameData._id
            ? bookedByNameData._id.toString()
            : undefined
          : bookedByNameData._id.toString(),
        name: bookedByNameData.name,
        updatedBy:{ id: bookedByNameData.updatedBy},
        createdBy:{ id: bookedByNameData.createdBy},
      };
      return bookedByNameEntity;
    }
  }

  static toModel(bookedByName: BookedByNameEntity): BookedByNameModel {
    return {
      name: bookedByName.name,
      updatedBy: bookedByName.updatedBy,
      createdBy: bookedByName.createdBy,
    };
  }
}
