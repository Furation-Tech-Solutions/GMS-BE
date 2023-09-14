// Express API request populate the Admin Model
export class AdminModel {
  constructor(
    public name: string = "",
    public email: string = "",
    public phone: number = 0,
    public brand: string = "",
    public jobTitle: string = "",
    public superAdmin: boolean = false,
    public admin: boolean = false,
    public permissions: number[] = [],
    public active: boolean = false,
    public outlet: string = "",
    public fuid: string = ""
  ) {}
}

// Admin Entity provided by Admin Repository is converted to Express API Response
export class AdminEntity {
  constructor(
    public id: string | undefined = undefined,
    public name: string,
    public email: string,
    public phone: number,
    public brand: string,
    public jobTitle: string,
    public superAdmin: boolean,
    public admin: boolean,
    public permissions: number[],
    public active: boolean,
    public outlet: string,
    public fuid: string
  ) {}
}

export class AdminMapper {
  static toEntity(
    adminData: any,
    includeId?: boolean,
    existingAdmin?: AdminEntity | null
  ): AdminEntity {
    if (existingAdmin != null) {
      return {
        ...existingAdmin,
        name:
          adminData.name !== undefined ? adminData.name : existingAdmin.name,
        email:
          adminData.email !== undefined ? adminData.email : existingAdmin.email,
        phone:
          adminData.phone !== undefined ? adminData.phone : existingAdmin.phone,
        brand:
          adminData.brand !== undefined ? adminData.brand : existingAdmin.brand,
        jobTitle:
          adminData.jobTitle !== undefined
            ? adminData.jobTitle
            : existingAdmin.jobTitle,
        superAdmin:
          adminData.superAdmin !== undefined
            ? adminData.superAdmin
            : existingAdmin.superAdmin,
        admin:
          adminData.admin !== undefined ? adminData.admin : existingAdmin.admin,
        permissions:
          adminData.permissions !== undefined
            ? adminData.permissions
            : existingAdmin.permissions,
        active:
          adminData.active !== undefined
            ? adminData.active
            : existingAdmin.active,
        outlet:
          adminData.outlet !== undefined
            ? adminData.outlet
            : existingAdmin.outlet,
        fuid:
          adminData.fuid !== undefined ? adminData.fuid : existingAdmin.fuid,
      };
    } else {
      const adminEntity: AdminEntity = {
        id: includeId
          ? adminData._id
            ? adminData._id.toString()
            : undefined
          : undefined,
        name: adminData.name,
        email: adminData.email,
        phone: adminData.phone,
        brand: adminData.brand,
        jobTitle: adminData.jobTitle,
        superAdmin: adminData.superAdmin,
        admin: adminData.admin,
        permissions: adminData.permissions,
        active: adminData.active,
        outlet: adminData.outlet,
        fuid: adminData.fuid,
      };
      return adminEntity;
    }
  }

  static toModel(admin: AdminEntity): AdminModel {
    return {
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      brand: admin.brand,
      jobTitle: admin.jobTitle,
      superAdmin: admin.superAdmin,
      admin: admin.admin,
      permissions: admin.permissions,
      active: admin.active,
      outlet: admin.outlet,
      fuid: admin.fuid,
    };
  }
}


