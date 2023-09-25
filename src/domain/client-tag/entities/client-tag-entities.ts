// Express API request populate the clientTagModel
export class ClientTagModel {
  constructor(
    public name: string = "",
    public categoryNameId: string | { _id: string } = "",
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public createdAt: Date
  ) {}
}

// client TagEntity provided by client Tag Repository is converted to Express API Response
export class ClientTagEntity {
  constructor(
    public _id: string | undefined = undefined, // Set a default value for id
    public name: string = "",
    public categoryNameId: string | { _id: string } = "",
    public updatedBy: string | { _id: string } | undefined,
    public createdBy: string | { _id: string } | undefined,
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
            ? { _id: clientTagData.categoryNameId }
            : existingClientTag.categoryNameId,
        updatedBy:
          clientTagData.updatedBy !== undefined
            ? { _id: clientTagData.updatedBy }
            : existingClientTag.updatedBy,
        createdBy:
          clientTagData.createdBy !== undefined
            ? { _id: clientTagData.createdBy }
            : existingClientTag.createdBy,
        createdAt:
          clientTagData.createdAt !== undefined
            ? clientTagData.createdAt
            : existingClientTag.createdAt,
      };
    } else {
      const ClientTagEntity: ClientTagEntity = {
        _id: includeId
          ? clientTagData._id
            ? clientTagData._id.toString()
            : undefined
          : clientTagData._id.toString(),
        name: clientTagData.name,
        categoryNameId: { _id: clientTagData.categoryNameId },
        updatedBy: { _id: clientTagData.updatedBy },
        createdBy: { _id: clientTagData.createdBy },
        createdAt: clientTagData.createdAt,
      };
      return ClientTagEntity;
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
