// Express API request populate the Room Model
export class RoomModel {
  constructor(
    public abbreviation: string = "",
    public roomName: string = "",
    public listOrder: number = 0
  ) {}
}

// Room Entity provided by Outlet Repository is converted to Express API Response
export class RoomEntity {
  constructor(
    public id: string | undefined = undefined,
    public abbreviation: string,
    public roomName: string,
    public listOrder: number
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
      };
    } else {
      const roomEntity: RoomEntity = {
        id: includeId
          ? roomData._id
            ? roomData._id.toString()
            : undefined
          : undefined,
        abbreviation: roomData.abbreviation,
        roomName: roomData.roomName,

        listOrder: roomData.listOrder,
      };
      return roomEntity;
    }
  }

  static toModel(room: RoomEntity): RoomModel {
    return {
      abbreviation: room.abbreviation,
      roomName: room.roomName,
      listOrder: room.listOrder,
    };
  }
}
