// Express API request populate the clientTagModel
export class ClientTagModel {
  constructor(
    public name: string = "",
    public categoryNameId: string = "",
    public createdAt: Date
  ) { }
}

// client TagEntity provided by client Tag Repository is converted to Express API Response
export class ClientTagEntity {
  constructor(
    public _id: string | undefined = undefined, // Set a default value for id
    public name: string = "",
    public categoryNameId: string = "",
    public createdAt: Date
  ) { }
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
        name: clientTagData.name !== undefined ? clientTagData.name : existingClientTag.name,
        categoryNameId: clientTagData.categoryNameId !== undefined ? clientTagData.categoryNameId : existingClientTag.categoryNameId,
        createdAt: clientTagData.createdAt !== undefined ? clientTagData.createdAt : existingClientTag.createdAt,
      };
    } else {
      const ClientTagEntity: ClientTagEntity = {
        _id: includeId ? (clientTagData._id ? clientTagData._id.toString() : undefined) : clientTagData._id.toString(),
        name: clientTagData.name,
        categoryNameId: clientTagData.categoryNameId,
        createdAt: clientTagData.createdAt,
      };
      return clientTagData;
    }
  }

  static toModel(clientTag: ClientTagEntity): any {
    return {
      name: clientTag.name,
      categoryNameId: clientTag.categoryNameId,
      createdAt: clientTag.createdAt,
    };
  }
}