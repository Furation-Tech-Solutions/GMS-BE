
export class AccessLevelModel{
    constructor(
        public role:string= "",
        public permissions: any = null,
        public additional_options:any=null,
        public emailSubscription: any = null,
    ){}
}

export class AccessLevelEntity{
    constructor(
        public id: string | undefined = undefined,
        public role:string,
        public permissions: any ,
        public additional_options:any,
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
                additional_options:
                    accessLevelData.additional_options !== undefined
                    ? accessLevelData.additional_options
                    : existingAccessLevel.additional_options,
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
                      : accessLevelData._id.toString(),
                    role: accessLevelData.role,
                    permissions:accessLevelData.permissions,
                    additional_options:accessLevelData.additional_options,
                    emailSubscription:accessLevelData.emailSubscription
                };
                return accessLevelEntity;
            }
        }
    static toModel(accessLevel: AccessLevelEntity):AccessLevelModel {
        return {
              role: accessLevel.role,
              permissions:accessLevel.permissions,
              additional_options:accessLevel.additional_options,
              emailSubscription:accessLevel.emailSubscription,
        }
    }
    }