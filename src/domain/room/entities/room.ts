// Express API request populate the Room Model
export class RoomModel {
  constructor(
    public abbreviation: string = "",
    public roomName: string = "",
    public listOrder: number = 0,
    public updatedBy?: string | undefined,
    public createdBy?: string | undefined
  ) {}
}

// Room Entity provided by Outlet Repository is converted to Express API Response
export class RoomEntity {
  constructor(
    public _id: string | undefined = undefined,
    public abbreviation: string,
    public roomName: string,
    public listOrder: number,
    public updatedBy?: string | undefined,
    public createdBy?: string | undefined
  ) {}
}

export class RoomMapper {
  static toEntity(
    roomData: any,
    includeId?: boolean,
    existingRoom?: RoomEntity
  ): RoomEntity {
    if (existingRoom != null) {
      return {
        ...existingRoom,
        abbreviation:
          roomData.abbreviation !== undefined
            ? roomData.abbreviation
            : existingRoom.abbreviation,
        roomName:
          roomData.roomName !== undefined
            ? roomData.roomName
            : existingRoom.roomName,
        listOrder:
          roomData.listOrder !== undefined
            ? roomData.listOrder
            : existingRoom.listOrder,
        updatedBy:
          roomData.updatedBy !== undefined
            ? roomData.updatedBy
            : existingRoom.updatedBy,
        createdBy:
          roomData.createdBy !== undefined
            ? roomData.createdBy
            : existingRoom.createdBy,
      };
    } else {
      const roomEntity: RoomEntity = {
        _id: includeId
          ? roomData._id
            ? roomData._id.toString()
            : undefined
          : roomData._id.toString(),
        abbreviation: roomData.abbreviation,
        roomName: roomData.roomName,
        listOrder: roomData.listOrder,
        updatedBy: roomData.updatedBy,
        createdBy: roomData.createdBy,
      };
      return roomEntity;
    }
  }

  static toModel(room: RoomEntity): RoomModel {
    return {
      abbreviation: room.abbreviation,
      roomName: room.roomName,
      listOrder: room.listOrder,
      updatedBy: room.updatedBy,
      createdBy: room.createdBy,
    };
  }
}
