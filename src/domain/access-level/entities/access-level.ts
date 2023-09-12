
export class AccessLevelModel{
    constructor(
        public role:string= "",
        public permissions: any = null,
        public additional_options:any=null,
        public email_subscriptions: any = null,
    ){}
}

export class AccessLevelEntity{
    constructor(
        public id: string | undefined = undefined,
        public role:string,
        public permissions: any ,
        public additional_options:any,
        public email_subscriptions: any 
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
                additional_options:
                    accessLevelData.additional_options !== undefined
                    ? accessLevelData.additional_options
                    : existingAccessLevel.additional_options,
                    email_subscriptions:
                    accessLevelData.email_subscriptions !== undefined
                    ? accessLevelData.email_subscriptions
                    : existingAccessLevel.email_subscriptions,
              }
            }else{
                const accessLevelEntity: AccessLevelEntity = {
                    id: includeId
                      ? accessLevelData._id
                        ? accessLevelData._id.toString()
                        : undefined
                      : accessLevelData._id.toString(),
                    role: accessLevelData.role,
                    permissions:accessLevelData.permissions,
                    additional_options:accessLevelData.additional_options,
                    email_subscriptions:accessLevelData.email_subscriptions
                };
                return accessLevelEntity;
            }
        }
    static toModel(accessLevel: AccessLevelEntity):AccessLevelModel {
        return {
              role: accessLevel.role,
              permissions:accessLevel.permissions,
              additional_options:accessLevel.additional_options,
              email_subscriptions:accessLevel.email_subscriptions,
        }
    }
    }