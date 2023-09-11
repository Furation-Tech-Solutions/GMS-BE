
export class AccessLevelModel{
    constructor(
        public role:string= "",
        public permissions: any = null,
        public emailSubscription: any = null,
    ){}
}

export class AccessLevelEntity{
    constructor(
        public id: string | undefined = undefined,
        public role:string,
        public permissions: any ,
        public emailSubscription: any 
    ){}
}
export class AccessLevelMapper {
    static toEntity(
      accessLevelData: any,
      includeId?: boolean,
      existingAccessLevel?: AccessLevelEntity
    ): AccessLevelEntity {
            if (existingAccessLevel != null) {
              return {
                ...existingAccessLevel,
                role:
                   accessLevelData.role !== undefined
                    ? accessLevelData.role
                    : existingAccessLevel.role,
                permissions:
                    accessLevelData.permissions !== undefined
                    ? accessLevelData.permissions
                    : existingAccessLevel.permissions,
                emailSubscription:
                    accessLevelData.emailSubscription !== undefined
                    ? accessLevelData.emailSubscription
                    : existingAccessLevel.emailSubscription,
              }
            }else{
                const accessLevelEntity: AccessLevelEntity = {
                    id: includeId
                      ? accessLevelData._id
                        ? accessLevelData._id.toString()
                        : undefined
                      : undefined,
                    role: accessLevelData.role,
                    permissions:accessLevelData.permissions,
                    emailSubscription:accessLevelData.emailSubscription
                };
                return accessLevelEntity;
            }
        }
    static toModel(accessLevel: AccessLevelEntity):AccessLevelModel {
        return {
              role: accessLevel.role,
              permissions:accessLevel.permissions,
              emailSubscription:accessLevel.emailSubscription,
        }
    }
    }