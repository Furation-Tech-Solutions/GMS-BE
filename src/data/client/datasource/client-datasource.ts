import mongoose from "mongoose";
import { ClientModel } from "@domain/client/entities/client_entities"; // Import the ClientModel
import { Client } from "../models/client_model";
import ApiError from "@presentation/error-handling/api-error";

// Create ClientDataSource Interface
export interface ClientDataSource {
  create(client: ClientModel): Promise<any>;
  update(id: String, client: ClientModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAllClients(): Promise<any[]>;
}

// Client Data Source communicates with the database
export class ClientDataSourceImpl implements ClientDataSource {
  constructor(private db: mongoose.Connection) {}
  async create(client: ClientModel): Promise<any> {


    const existingClient = await Client.findOne();
    // if (existingClient) {
    //   throw ApiError.clientExist();
    // }
    const clientData = new Client(client);
    const createdClient = await clientData.save();
    return createdClient.toObject();
  }
  async delete(id: string): Promise<void> {
    try {
      await Client.findByIdAndDelete(id);
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async read(id: string): Promise<any | null> {
    try {
      const client = await Client.findById(id).populate({
        path: "tags", // Populate the reservationTags field
        select: "id name categoryNameId", // Adjust the fields you want to select
        populate: {
          path: "categoryNameId", // Populate the categoryNameId field in reservationTags
          select: "id name color",
          model: "ClientTagCategory", // Reference to the Category model
        },
      }).populate({
        path: "activityLogs",
        select:"timestamp message",
      });

      return client ? client.toObject() : null;
    } catch (error) {
      console.log(error)
      throw ApiError.badRequest();
    } // Convert to a plain JavaScript object before returning
  }
  async getAllClients(): Promise<any[]> {
    // try {
    //   const clients = await Client.find().populate("tags");
    const clients = await Client.find({ isClient: true }).populate({
      path: "tags", // Populate the reservationTags field
      select: "id name categoryNameId", // Adjust the fields you want to select
      populate: {
        path: "categoryNameId", // Populate the categoryNameId field in reservationTags
        select: "id name color",
        model: "ClientTagCategory", // Reference to the Category model
      },
    })


    return clients.map((client) => client.toObject()); // Convert to plain JavaScript objects before returning
    // } catch (error) {
    //   throw ApiError.badRequest();
    // }
  }

  async update(id: string, client: ClientModel): Promise<any> {
    const updatedClient = await Client.findByIdAndUpdate(id, client, {
      new: true,
    }); // No need for conversion here
    return updatedClient ? updatedClient.toObject() : null; // Convert to a plain JavaScript object before returning
  }
}
