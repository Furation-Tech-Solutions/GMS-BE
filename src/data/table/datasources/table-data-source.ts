import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { TableModel } from "@domain/table/entities/table";
import { Table } from "../models/table-model";

export interface TableDataSource {
  create(table: TableModel): Promise<any>;
  getById(id: string): Promise<any | null>;
  getAllTables(): Promise<any[]>;
  update(id: string, table: TableModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class TableDataSourceImpl implements TableDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(table: TableModel): Promise<any> {
    const existingTable = await Table.findOne({ tableNo: table.tableNo });
    if (existingTable) {
      throw ApiError.emailExist();
    }

    const tableData = new Table(table);

    const createdTable = await tableData.save();

    return createdTable.toObject();
  }

  async getById(id: string): Promise<any | null> {
    const table = await Table.findById(id);
    return table ? table.toObject() : null;
  }

  async getAllTables(): Promise<any[]> {
    const tables = await Table.find();
    return tables.map((table) => table.toObject());
  }

  async update(id: string, table: TableModel): Promise<any> {
    const updatedTable = await Table.findByIdAndUpdate(id, table, {
      new: true,
    });
    return updatedTable ? updatedTable.toObject() : null;
  }

  async delete(id: string): Promise<void> {
    await Table.findByIdAndDelete(id);
  }
}
