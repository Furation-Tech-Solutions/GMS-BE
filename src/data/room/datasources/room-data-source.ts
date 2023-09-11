import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { RoomModel } from "@domain/room/entities/room";
import { Room } from "../models/room-model";
// import { Admin } from "@data/admin/models/admin-model";

export interface RoomDataSource {
  create(room: RoomModel): Promise<any>;
  getById(id: string): Promise<any | null>;
  getAllRooms(): Promise<any[]>;
  update(id: string, room: RoomModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class RoomDataSourceImpl implements RoomDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(room: RoomModel): Promise<any> {
    const existingRoom = await Room.findOne({ roomName: room.roomName });
    if (existingRoom) {
      throw ApiError.emailExist();
    }

    const roomData = new Room(room);

    const createdRoom = await roomData.save();

    return createdRoom.toObject();
  }

  async getById(id: string): Promise<any | null> {
    const room = await Room.findById(id);
    return room ? room.toObject() : null;
  }

  async getAllRooms(): Promise<any[]> {
    const rooms = await Room.find();
    return rooms.map((room) => room.toObject());
  }

  async update(id: string, room: RoomModel): Promise<any> {
    const updatedRoom = await Room.findByIdAndUpdate(id, room, {
      new: true,
    });
    return updatedRoom ? updatedRoom.toObject() : null;
  }

  async delete(id: string): Promise<void> {
    await Room.findByIdAndDelete(id);
  }
}
