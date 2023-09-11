

export class ProgramScheduleModel {
    constructor(
      public title: string = "",
      public startDate: Date = new Date(),
      public endDate: Date | null = null,
      public daysOfWeek: string[] = [],
      public shifts: string[] = [],
      public cuisine: string = "",
      public pricePoint: string = "",
      public description: string = "",
      public dressCode: string = "",
      public tableHoldingPolicy: string = "",
      public spendPolicy: string = "",
      public childPolicy: string = ""
    ) {}
  }

  export class ProgramScheduleEntity {
    constructor(
      public id: string | undefined = undefined,
      public title: string,
      public startDate: Date,
      public endDate: Date | null,
      public daysOfWeek: string[],
      public shifts: string[],
      public cuisine: string,
      public pricePoint: string,
      public description: string,
      public dressCode: string,
      public tableHoldingPolicy: string,
      public spendPolicy: string,
      public childPolicy: string
    ) {}
  }


  export class ProgramScheduleMapper {
    static toEntity(
      programScheduleData: any,
      includeId?: boolean,
      existingProgramSchedule?: ProgramScheduleEntity | null
    ): ProgramScheduleEntity {
      if (existingProgramSchedule != null) {
        return {
          ...existingProgramSchedule,
          title:
            programScheduleData.title !== undefined
              ? programScheduleData.title
              : existingProgramSchedule.title,
          startDate:
            programScheduleData.startDate !== undefined
              ? programScheduleData.startDate
              : existingProgramSchedule.startDate,
          endDate:
            programScheduleData.endDate !== undefined
              ? programScheduleData.endDate
              : existingProgramSchedule.endDate,
          daysOfWeek:
            programScheduleData.daysOfWeek !== undefined
              ? programScheduleData.daysOfWeek
              : existingProgramSchedule.daysOfWeek,
          shifts:
            programScheduleData.shifts !== undefined
              ? programScheduleData.shifts
              : existingProgramSchedule.shifts,
          cuisine:
            programScheduleData.cuisine !== undefined
              ? programScheduleData.cuisine
              : existingProgramSchedule.cuisine,
          pricePoint:
            programScheduleData.pricePoint !== undefined
              ? programScheduleData.pricePoint
              : existingProgramSchedule.pricePoint,
          description:
            programScheduleData.description !== undefined
              ? programScheduleData.description
              : existingProgramSchedule.description,
          dressCode:
            programScheduleData.dressCode !== undefined
              ? programScheduleData.dressCode
              : existingProgramSchedule.dressCode,
          tableHoldingPolicy:
            programScheduleData.tableHoldingPolicy !== undefined
              ? programScheduleData.tableHoldingPolicy
              : existingProgramSchedule.tableHoldingPolicy,
          spendPolicy:
            programScheduleData.spendPolicy !== undefined
              ? programScheduleData.spendPolicy
              : existingProgramSchedule.spendPolicy,
          childPolicy:
            programScheduleData.childPolicy !== undefined
              ? programScheduleData.childPolicy
              : existingProgramSchedule.childPolicy,
        };
      } else {
        const programScheduleEntity: ProgramScheduleEntity = {
          id: includeId
            ? programScheduleData._id
              ? programScheduleData._id.toString()
              : undefined
            : undefined,
          title: programScheduleData.title,
          startDate: programScheduleData.startDate,
          endDate: programScheduleData.endDate,
          daysOfWeek: programScheduleData.daysOfWeek,
          shifts: programScheduleData.shifts,
          cuisine: programScheduleData.cuisine,
          pricePoint: programScheduleData.pricePoint,
          description: programScheduleData.description,
          dressCode: programScheduleData.dressCode,
          tableHoldingPolicy: programScheduleData.tableHoldingPolicy,
          spendPolicy: programScheduleData.spendPolicy,
          childPolicy: programScheduleData.childPolicy,
        };
        return programScheduleEntity;
      }
    }
  
    static toModel(programSchedule: ProgramScheduleEntity): ProgramScheduleModel {
      return {
        title: programSchedule.title,
        startDate: programSchedule.startDate,
        endDate: programSchedule.endDate,
        daysOfWeek: programSchedule.daysOfWeek,
        shifts: programSchedule.shifts,
        cuisine: programSchedule.cuisine,
        pricePoint: programSchedule.pricePoint,
        description: programSchedule.description,
        dressCode: programSchedule.dressCode,
        tableHoldingPolicy: programSchedule.tableHoldingPolicy,
        spendPolicy: programSchedule.spendPolicy,
        childPolicy: programSchedule.childPolicy,
      };
    }
  }
  
  