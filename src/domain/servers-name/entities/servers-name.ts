// Express API request to populate the BookedByName Model
export class ServersNameModel {
    constructor(public server_name: string = "") {}
  }
  
  // BookedByName Entity provided by BookedByName Repository is converted to Express API Response
  export class ServersNameEntity {
    constructor(
      public id: string | undefined = undefined,
      public server_name: string
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
        };
      } else {
        const serversNameEntity: ServersNameEntity = {
          id: includeId
            ? serverNameData._id
              ? serverNameData._id.toString()
              : undefined
            : serverNameData._id.toString(),
            server_name: serverNameData.server_name,
        };
        return serversNameEntity;
      }
    }
  
    static toModel(serverName: ServersNameEntity): ServersNameModel {
      return {
        
        server_name: serverName.server_name,
      };
    }
  }
  