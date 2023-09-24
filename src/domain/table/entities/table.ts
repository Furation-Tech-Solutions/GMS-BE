// Table Model
export class TableModel {
  constructor(
    public tableNo: number = 0,
    public partySizeMini: number = 0,
    public partySizeMax: number = 0,
    public tableCombinations: string[] | undefined = [],
    public seatingArea: string = "",
    public updatedBy: string | undefined = undefined,
    public createdBy: string | undefined = undefined
  ) {}
}

// Table Entity
export class TableEntity {
  constructor(
    public _id: string | undefined = undefined,
    public tableNo: number,
    public partySizeMini: number,
    public partySizeMax: number,
    public tableCombinations: string[] | undefined = [], // Optional field
    public seatingArea: string, // Assuming seatingArea is an ObjectId string
    public updatedBy: string | undefined,
    public createdBy: string | undefined
  ) {}
}

// Table Mapper
export class TableMapper {
  static toEntity(
    tableData: any,
    includeId?: boolean,
    existingTable?: TableEntity
  ): TableEntity {
    if (existingTable != null) {
      return {
        ...existingTable,
        tableNo:
          tableData.tableNo !== undefined
            ? tableData.tableNo
            : existingTable.tableNo,
        partySizeMini:
          tableData.partySizeMini !== undefined
            ? tableData.partySizeMini
            : existingTable.partySizeMini,
        partySizeMax:
          tableData.partySizeMax !== undefined
            ? tableData.partySizeMax
            : existingTable.partySizeMax,
        tableCombinations:
          tableData.tableCombinations !== undefined
            ? tableData.tableCombinations
            : existingTable.tableCombinations,
        seatingArea:
          tableData.seatingArea !== undefined
            ? tableData.seatingArea
            : existingTable.seatingArea,
        createdBy:
          tableData.createdBy !== undefined
            ? tableData.createdBy
            : existingTable.createdBy,
        updatedBy:
          tableData.updatedBy !== undefined
            ? tableData.updatedBy
            : existingTable.updatedBy,
      };
    } else {
      const tableEntity: TableEntity = {
        _id: includeId
          ? tableData._id
            ? tableData._id.toString()
            : undefined
          : tableData._id.toString(),
        tableNo: tableData.tableNo,
        partySizeMini: tableData.partySizeMini,
        partySizeMax: tableData.partySizeMax,
        tableCombinations: tableData.tableCombinations,
        seatingArea: tableData.seatingArea.toString(), // Convert ObjectId to string
        updatedBy: tableData.updatedBy,
        createdBy: tableData.createdBy,
      };
      return tableEntity;
    }
  }

  static toModel(table: TableEntity): TableModel {
    return new TableModel(
      table.tableNo,
      table.partySizeMini,
      table.partySizeMax,
      table.tableCombinations,
      table.seatingArea,
      table.updatedBy,
      table.createdBy
    );
  }
}
