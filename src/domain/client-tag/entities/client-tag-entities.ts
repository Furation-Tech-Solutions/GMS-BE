// Express API request populate the clientTagModel
export class ClientTagModel {
  constructor(
    public name: string = "",
    public categoryNameId: string = "",
    public updatedBy: string | undefined = undefined,
    public createdBy: string | undefined = undefined,
    public createdAt: Date
  ) {}
}

// client TagEntity provided by client Tag Repository is converted to Express API Response
export class ClientTagEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string = "",
    public categoryNameId: string = "",
    public updatedBy: string | undefined,
    public createdBy: string | undefined,
    public createdAt: Date
  ) {}
}

/* ================================================= */
export class ClientTagMapper {
  static toEntity(
    clientTagData: any,
    includeId?: boolean,
    existingClientTag?: ClientTagEntity
  ): ClientTagEntity {
    if (existingClientTag != null) {
      return {
        ...existingClientTag,
        name:
          clientTagData.name !== undefined
            ? clientTagData.name
            : existingClientTag.name,
        categoryNameId:
          clientTagData.categoryNameId !== undefined
            ? clientTagData.categoryNameId
            : existingClientTag.categoryNameId,
        updatedBy:
          clientTagData.updatedBy !== undefined
            ? clientTagData.updatedBy
            : existingClientTag.updatedBy,
        createdBy:
          clientTagData.createdBy !== undefined
            ? clientTagData.createdBy
            : existingClientTag.createdBy,
        createdAt:
          clientTagData.createdAt !== undefined
            ? clientTagData.createdAt
            : existingClientTag.createdAt,
      };
    } else {
      const ClientTagEntity: ClientTagEntity = {
        id: includeId
          ? clientTagData._id
            ? clientTagData._id.toString()
            : undefined
          : clientTagData._id.toString(),
        name: clientTagData.name,
        categoryNameId: clientTagData.categoryNameId,
        updatedBy: clientTagData.updatedBy,
        createdBy: clientTagData.createdBy,
        createdAt: clientTagData.createdAt,
      };
      return clientTagData;
    }
  }

  static toModel(clientTag: ClientTagEntity): any {
    return {
      name: clientTag.name,
      categoryNameId: clientTag.categoryNameId,
      updatedBy: clientTag.updatedBy,
      createdBy: clientTag.createdBy,
      createdAt: clientTag.createdAt,
    };
  }
}
