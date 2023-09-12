

// Express API request populate the Outlet Model
export class OutletModel {
  constructor(
    public brandLogo: string = "",
    public outletName: string = "",
    public email: string = "",
    public phone: string = "",
    public altPhone: string = "",
    public address: string = "",
    public city: string = "",
    public state: string = "",
    public country: string = "",
    public pincode: number = 0,
    public active: boolean = true,
    public admins: string[] = []
  ) {}
}

// Outlet Entity provided by Outlet Repository is converted to Express API Response
export class OutletEntity {
  constructor(
    public id: string | undefined = undefined,
    public brandLogo: string,
    public outletName: string,
    public email: string,
    public phone: string,
    public altPhone: string,
    public address: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public active: boolean,
    public admins: string[]
  ) {}
}

export class OutletMapper {
  static toEntity(
    outletData: any,
    includeId?: boolean,
    existingOutlet?: OutletEntity
  ): OutletEntity {
    if (existingOutlet != null) {
      return {
        ...existingOutlet,
        brandLogo:
          outletData.brandLogo !== undefined
            ? outletData.brandLogo
            : existingOutlet.brandLogo,
        outletName:
          outletData.outletName !== undefined
            ? outletData.outletName
            : existingOutlet.outletName,
        email:
          outletData.email !== undefined
            ? outletData.email
            : existingOutlet.email,
        phone:
          outletData.phone !== undefined
            ? outletData.phone
            : existingOutlet.phone,
        altPhone:
          outletData.altPhone !== undefined
            ? outletData.altPhone
            : existingOutlet.altPhone,
        address:
          outletData.address !== undefined
            ? outletData.address
            : existingOutlet.address,
        city:
          outletData.city !== undefined ? outletData.city : existingOutlet.city,
        state:
          outletData.state !== undefined
            ? outletData.state
            : existingOutlet.state,
        country:
          outletData.country !== undefined
            ? outletData.country
            : existingOutlet.country,
        pincode:
          outletData.pincode !== undefined
            ? outletData.pincode
            : existingOutlet.pincode,
        active:
          outletData.active !== undefined
            ? outletData.active
            : existingOutlet.active,
        admins:
          outletData.admins !== undefined
            ? outletData.admins
            : existingOutlet.admins,
      };
    } else {
  
      const outletEntity: OutletEntity = {
        id: includeId
          ? outletData._id
            ? outletData._id.toString()
            : undefined
          : undefined,
        brandLogo: outletData.brandLogo,
        outletName: outletData.outletName,
        email: outletData.email,
        phone: outletData.phone,
        altPhone: outletData.altPhone,
        address: outletData.address,
        city: outletData.city,
        state: outletData.state,
        country: outletData.country,
        pincode: outletData.pincode,
        active: outletData.active,
        admins: outletData.admins,
      };
      return outletEntity;
    }
  }

  static toModel(outlet: OutletEntity):OutletModel {
    return {
      brandLogo: outlet.brandLogo,
      outletName: outlet.outletName,
      email: outlet.email,
      phone: outlet.phone,
      altPhone: outlet.altPhone,
      address: outlet.address,
      city: outlet.city,
      state: outlet.state,
      country: outlet.country,
      pincode: outlet.pincode,
      active: outlet.active,
      admins: outlet.admins,
    };
  }
}
