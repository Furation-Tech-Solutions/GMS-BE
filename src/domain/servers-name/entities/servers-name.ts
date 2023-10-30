// Express API request to populate the BookedByName Model
export class ServersNameModel {
  constructor(
    public server_name: string = "",
    public outletId: string | undefined,
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined
  ) {}
}

// BookedByName Entity provided by BookedByName Repository is converted to Express API Response
export class ServersNameEntity {
  constructor(
    public _id: string | undefined = undefined,
    public server_name: string,
    public outletId: string,
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined
  ) {}
}

export class ServersNameMapper {
  static toEntity(
    serverNameData: any,
    includeId?: boolean,
    existingServerName?: ServersNameEntity | null
  ): ServersNameEntity {
    if (existingServerName != null) {
      return {
        ...existingServerName,
        server_name:
          serverNameData.server_name !== undefined
            ? serverNameData.server_name
            : existingServerName.server_name,
        outletId:
          serverNameData.outletId !== undefined
            ? serverNameData.outletId
            : existingServerName.outletId,
        updatedBy:
          serverNameData.updatedBy !== undefined
            ? { _id: serverNameData.updatedBy }
            : existingServerName.updatedBy,
        createdBy:
          serverNameData.createdBy !== undefined
            ? { _id: serverNameData.createdBy }
            : existingServerName.createdBy,
      };
    } else {
      const serversNameEntity: ServersNameEntity = {
        _id: includeId
          ? serverNameData._id
            ? serverNameData._id.toString()
            : undefined
          : serverNameData._id.toString(),
        server_name: serverNameData.server_name,
        outletId: serverNameData.outletId,
        updatedBy: { _id: serverNameData.updatedBy },
        createdBy: { _id: serverNameData.createdBy },
      };
      return serversNameEntity;
    }
  }

  static toModel(serverName: ServersNameEntity): ServersNameModel {
    return {
      server_name: serverName.server_name,
      outletId: serverName.outletId,
      updatedBy: serverName.updatedBy,
      createdBy: serverName.createdBy,
    };
  }
}
