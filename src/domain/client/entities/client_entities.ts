// Express API request populate the Client Model
export class ClientModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public salutation: string = "",
    public jobTitle: string = "",
    public company: string = "",
    public profileNotes: string = "",
    public privateNotes: string = "",
    public tags: string[] = [],
    public email: string = "",
    public altEmail: string = "",
    public phone: string = "",
    public workPhone: string = "",
    public address: string = "",
    public city: string = "",
    public state: string = "",
    public country: string = "",
    public pincode: number = 0,
    public contactInfoVisibilityOnlyToSuperUser: boolean,
    public birthDate: Date,
    public anniversaryDate: Date,
    public gender: string,
    public createdAt: Date
  ) { }
}

// Client Entity provided by Client Repository is converted to Express API Response
export class ClientEntity {
  constructor(
    public _id: string | undefined = undefined, // Set a default value for id
    public firstName: string = "",
    public lastName: string = "",
    public salutation: string = "",
    public jobTitle: string = "",
    public company: string = "",
    public profileNotes: string = "",
    public privateNotes: string = "",
    public tags: string[] = [],
    public email: string = "",
    public altEmail: string = "",
    public phone: string = "",
    public workPhone: string = "",
    public address: string = "",
    public city: string = "",
    public state: string = "",
    public country: string = "",
    public pincode: number = 0,
    public contactInfoVisibilityOnlyToSuperUser: boolean,
    public birthDate: Date,
    public anniversaryDate: Date,
    public gender: string,
    public createdAt: Date
  ) { }
}

/* ================================================= */
export class ClientMapper {
  static toEntity(
    clientData: any,
    includeId?: boolean,
    existingClient?: ClientEntity
  ): ClientEntity {
    if (existingClient != null) {
      return {
        ...existingClient,
        firstName: clientData.firstName !== undefined ? clientData.firstName : existingClient.firstName,
        lastName: clientData.lastName !== undefined ? clientData.lastName : existingClient.firstName,
        salutation: clientData.salutation !== undefined ? clientData.salutation : existingClient.salutation,
        jobTitle: clientData.jobTitle !== undefined ? clientData.jobTitle : existingClient.jobTitle,
        company: clientData.company !== undefined ? clientData.company : existingClient.company,
        profileNotes: clientData.profileNotes !== undefined ? clientData.profileNotes : existingClient.profileNotes,
        privateNotes: clientData.privateNotes !== undefined ? clientData.privateNotes : existingClient.privateNotes,
        tags: clientData.tags !== undefined ? clientData.tags : existingClient.tags,
        email: clientData.email !== undefined ? clientData.email : existingClient.email,
        altEmail: clientData.altEmail !== undefined ? clientData.altEmail : existingClient.altEmail,
        phone: clientData.phone !== undefined ? clientData.phone : existingClient.phone,
        workPhone: clientData.workPhone !== undefined ? clientData.workPhone : existingClient.workPhone,
        address: clientData.address !== undefined ? clientData.address : existingClient.address,
        city: clientData.city !== undefined ? clientData.city : existingClient.city,
        state: clientData.state !== undefined ? clientData.state : existingClient.state,
        country: clientData.country !== undefined ? clientData.country : existingClient.country,
        pincode: clientData.pincode !== undefined ? clientData.pincode : existingClient.pincode,
        contactInfoVisibilityOnlyToSuperUser: clientData.contactInfoVisibilityOnlyToSuperUser !== undefined
          ? clientData.contactInfoVisibilityOnlyToSuperUser
          : existingClient.contactInfoVisibilityOnlyToSuperUser,
        birthDate: clientData.birthDate !== undefined ? clientData.birthDate : existingClient.birthDate,
        anniversaryDate: clientData.anniversaryDate !== undefined ? clientData.anniversaryDate : existingClient.anniversaryDate,
        gender: clientData.gender !== undefined ? clientData.gender : existingClient.gender,
        createdAt: clientData.createdAt !== undefined ? clientData.createdAt : existingClient.createdAt,
      };
    } else {
      const clientEntity: ClientEntity = {
        _id: includeId ? (clientData._id ? clientData._id.toString() : undefined) : clientData._id.toString(),
        firstName: clientData.firstName || null,
        lastName: clientData.lastName || null,
        salutation: clientData.salutation || null,
        jobTitle: clientData.jobTitle || null,
        company: clientData.company || null,
        profileNotes: clientData.profileNotes || null,
        privateNotes: clientData.privateNotes || null,
        tags: clientData.tags || null,
        email: clientData.email || null,
        altEmail: clientData.altEmail || null,
        phone: clientData.phone || null,
        workPhone: clientData.workPhone || null,
        address: clientData.address || null,
        city: clientData.city || null,
        state: clientData.state || null,
        country: clientData.country || null,
        pincode: clientData.pincode || null,
        contactInfoVisibilityOnlyToSuperUser: clientData.contactInfoVisibilityOnlyToSuperUser || null,
        birthDate: clientData.birthDate || null,
        anniversaryDate: clientData.anniversaryDate || null,
        gender: clientData.gender || null,
        createdAt: clientData.createdAt || null,
      };
      return clientEntity;
    }
  }

  static toModel(client: ClientEntity): any {
    return {
      firstName: client.firstName,
      lastName: client.lastName,
      salutation: client.salutation,
      jobTitle: client.jobTitle,
      company: client.company,
      profileNotes: client.profileNotes,
      privateNotes: client.privateNotes,
      tags: client.tags,
      email: client.email,
      altEmail: client.altEmail,
      phone: client.phone,
      workPhone: client.workPhone,
      address: client.address,
      city: client.city,
      state: client.state,
      country: client.country,
      pincode: client.pincode,
      contactInfoVisibilityOnlyToSuperUser: client.contactInfoVisibilityOnlyToSuperUser,
      birthDate: client.birthDate,
      anniversaryDate: client.anniversaryDate,
      gender: client.gender,
      createdAt: client.createdAt,
    };
  }
}