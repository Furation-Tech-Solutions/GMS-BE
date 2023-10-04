

export class CheckInModel{
    constructor(
       public client: string = "" ,
       public  table: string = "" ,
       public checkInTime: string = ""
    ){}
}

export class CheckInEntity {
    constructor(
      public _id: string | undefined = undefined,
      public client: string,
      public  table: string ,
      public checkInTime: string
    ) {}
}


export class CheckInMapper {
    static toEntity(
      checkInData: any,
      includeId?: boolean,
      existingcheckInData?: CheckInEntity
    ): CheckInEntity {
      if (existingcheckInData != null) {
        return {
          ...existingcheckInData,
          client:
          checkInData.client !== undefined
              ? checkInData.client
              : existingcheckInData.client,
              table:
          checkInData.table !== undefined
              ? checkInData.table
              : existingcheckInData.table,
              checkInTime:
              checkInData.checkInTime !== undefined
              ? checkInData.checkInTime
              : existingcheckInData.checkInTime,
        };
      } else {
        const checkInEntity: CheckInEntity = {
          _id: includeId
            ? checkInData._id
              ? checkInData._id.toString()
              : undefined
            : checkInData._id.toString(),
          client: checkInData.client,
          table: checkInData.table,
          checkInTime: checkInData.checkInTime,
        };
        return checkInEntity;
      }
    }
  
    static toModel(checkInData: CheckInEntity):CheckInModel {
        return {
            client: checkInData.client,
            table:checkInData.table,
            checkInTime:checkInData.checkInTime,
        }
    }
  }
  