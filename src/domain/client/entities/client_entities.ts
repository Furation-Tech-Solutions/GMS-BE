// Express API request populate the Client Model
export class ClientModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public salution: string = "",
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
    public contactInfoVisibilityOnlytoSuperUser: boolean,
    public birthDate: Date,
    public anniversaryDate: Date,
    public gender: string,
    public createdAt: Date
  ) { }
}

// Client Entity provided by Client Repository is converted to Express API Response
export class ClientEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public firstName: string = "",
    public lastName: string = "",
    public salution: string = "",
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
    public contactInfoVisibilityOnlytoSuperUser: boolean,
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
        firstName: clientData.firstName !== undefined ? clientData.name : existingClient.firstName,
        lastName: clientData.firstName !== undefined ? clientData.name : existingClient.firstName,
        salution: clientData.salution !== undefined ? clientData.salution : existingClient.salution,
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
        contactInfoVisibilityOnlytoSuperUser: clientData.contactInfoVisibilityOnlytoSuperUser !== undefined
          ? clientData.contactInfoVisibilityOnlytoSuperUser
          : existingClient.contactInfoVisibilityOnlytoSuperUser,
        birthDate: clientData.birthDate !== undefined ? clientData.birthDate : existingClient.birthDate,
        anniversaryDate: clientData.anniversaryDate !== undefined ? clientData.anniversaryDate : existingClient.anniversaryDate,
        gender: clientData.gender !== undefined ? clientData.gender : existingClient.gender,
        createdAt: clientData.createdAt !== undefined ? clientData.createdAt : existingClient.createdAt,
      };
    } else {
      const clientEntity: ClientEntity = {
        id: includeId ? (clientData._id ? clientData._id.toString() : undefined) : clientData._id.toString(),
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        salution: clientData.salution,
        jobTitle: clientData.jobTitle,
        company: clientData.company,
        profileNotes: clientData.profileNotes,
        privateNotes: clientData.privateNotes,
        tags: clientData.tags,
        email: clientData.email,
        altEmail: clientData.altEmail,
        phone: clientData.phone,
        workPhone: clientData.workPhone,
        address: clientData.address,
        city: clientData.city,
        state: clientData.state,
        country: clientData.country,
        pincode: clientData.pincode,
        contactInfoVisibilityOnlytoSuperUser: clientData.contactInfoVisibilityOnlytoSuperUser,
        birthDate: clientData.birthDate,
        anniversaryDate: clientData.anniversaryDate,
        gender: clientData.gender,
        createdAt: clientData.createdAt,
      };
      return clientEntity;
    }
  }

  static toModel(client: ClientEntity): any {
    return {
      firstName: client.firstName,
      lastName: client.lastName,
      salution: client.salution,
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
      contactInfoVisibilityOnlytoSuperUser: client.contactInfoVisibilityOnlytoSuperUser,
      birthDate: client.birthDate,
      anniversaryDate: client.anniversaryDate,
      gender: client.gender,
      createdAt: client.createdAt,
    };
  }
}