// Express API request to populate the BookedByName Model
export class BookedByNameModel {
    constructor(public name: string = "") {}
  }
  
  // BookedByName Entity provided by BookedByName Repository is converted to Express API Response
  export class BookedByNameEntity {
    constructor(
      public id: string | undefined = undefined,
      public name: string
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
        };
      } else {
        const bookedByNameEntity: BookedByNameEntity = {
          id: includeId
            ? bookedByNameData._id
              ? bookedByNameData._id.toString()
              : undefined
            : bookedByNameData._id.toString(),
          name: bookedByNameData.name,
        };
        return bookedByNameEntity;
      }
    }
  
    static toModel(bookedByName: BookedByNameEntity): BookedByNameModel {
      return {
        
        name: bookedByName.name,
      };
    }
  }
  