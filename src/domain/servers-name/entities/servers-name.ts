// Express API request to populate the BookedByName Model
export class ServersNameModel {
  constructor(
    public server_name: string = "",
    public updatedBy: string | undefined = undefined,
    public createdBy: string | undefined = undefined
  ) {}
}

// BookedByName Entity provided by BookedByName Repository is converted to Express API Response
export class ServersNameEntity {
  constructor(
    public id:  { id: string } | string | undefined,
    public server_name: string,
    public updatedBy: string | undefined,
    public createdBy: string | undefined
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
        updatedBy:
          serverNameData.updatedBy !== undefined
            ? serverNameData.updatedBy
            : existingServerName.updatedBy,
        createdBy:
          serverNameData.createdBy !== undefined
            ? serverNameData.createdBy
            : existingServerName.createdBy,
      };
    } else {
      const serversNameEntity: ServersNameEntity = {
        id:{ id: includeId ? (serverNameData._id ? serverNameData._id.toString() : undefined) : serverNameData._id.toString() },
        server_name: serverNameData.server_name,
        updatedBy: serverNameData.updatedBy,
        createdBy: serverNameData.createdBy,
      };
      return serversNameEntity;
    }
  }

  static toModel(serverName: ServersNameEntity): ServersNameModel {
    return {
      server_name: serverName.server_name,
      updatedBy: serverName.updatedBy,
      createdBy: serverName.createdBy,
    };
  }
}
