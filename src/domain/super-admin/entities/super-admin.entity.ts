// Express API request populate the Admin Model
export class SuperAdminModel {
  constructor(
    public name: string = "",
    public email: string = "",
    public phone: number = 0,
    public superAdmin: boolean = true,
    public permissions: number[] = []
  ) {}
}

// SuperAdmin Entity provided by SuperAdmin Repository is converted to Express API Response

export class SuperAdminEntity {
  constructor(
    public id: string | undefined = undefined,
    public name: string,
    public email: string,
    public phone: number,
    public superAdmin: boolean = true,
    public permissions: number[]
  ) {}
}

export class SuperAdminMapper {
  static toEntity(
    superAdminData: any,
    includeId?: boolean,
    existingSuperAdmin?: SuperAdminEntity
  ): SuperAdminEntity {
    if (existingSuperAdmin != null) {
      return {
        ...existingSuperAdmin,
        name:
          superAdminData.name !== undefined
            ? superAdminData.name
            : existingSuperAdmin.name,
        email:
          superAdminData.email !== undefined
            ? superAdminData.email
            : existingSuperAdmin.email,
        phone:
          superAdminData.phone !== undefined
            ? superAdminData.phone
            : existingSuperAdmin.phone,
        superAdmin:
          superAdminData.superAdmin !== undefined
            ? superAdminData.superAdmin
            : existingSuperAdmin.superAdmin,
      };
    } else {
      const superAdminEntity: SuperAdminEntity = {
        id: includeId
          ? superAdminData._id
            ? superAdminData._id.toString()
            : undefined
          : undefined,
        name: superAdminData.name,
        email: superAdminData.email,
        phone: superAdminData.phone,
        superAdmin: superAdminData.superAdmin,
        permissions: superAdminData.permissions,
      };
      return superAdminEntity;
    }
  }

  static toModel(superadmin: SuperAdminEntity): SuperAdminModel {
    return {
      name: superadmin.name,
      email: superadmin.email,
      phone: superadmin.phone,
      superAdmin: superadmin.superAdmin,
      permissions: superadmin.permissions,
    };
  }
}
