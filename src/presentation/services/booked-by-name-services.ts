import { BookedByNameEntity, BookedByNameMapper, BookedByNameModel } from "@domain/booked-by-name/entities/booked-by-name";
import { CreateBookedByNameUseCase } from "@domain/booked-by-name/usecase/create-booked-by-name";
import { DeleteBookedByNameUseCase } from "@domain/booked-by-name/usecase/delete-booked-by-name";
import { GetAllBookedByNameUsecase } from "@domain/booked-by-name/usecase/get-all-booked-by-name";
import { GetNameByIdUsecase } from "@domain/booked-by-name/usecase/get-booked-by-name-by-id";
import { UpdateBookedByNameUseCase } from "@domain/booked-by-name/usecase/update-booked-by-name";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";



export class BookedByNameService {
    private readonly createBookedByNameUseCase: CreateBookedByNameUseCase;
    // private readonly getBookedByNameByIdUsecase: GetBookedByNameByIdUsecase;
    // private readonly updateBookedByNameUsecase: UpdateBookedByNameUsecase;
    private readonly getAllBookedByNameUsecase: GetAllBookedByNameUsecase;
    private readonly getNameByIdUseCase:GetNameByIdUsecase;
    private readonly updateBookedByNameUseCase:UpdateBookedByNameUseCase;
    private readonly deleteBookedByNameUseCase: DeleteBookedByNameUseCase;

  
    constructor(
      createBookedByNameUseCase: CreateBookedByNameUseCase,
    //   getBookedByNameByIdUsecase: GetBookedByNameByIdUsecase,
    //   updateBookedByNameUsecase: UpdateBookedByNameUsecase,
      getAllBookedByNameUsecase: GetAllBookedByNameUsecase,
      getNameByIdUseCase:GetNameByIdUsecase,
      updateBookedByNameUseCase:UpdateBookedByNameUseCase,
      deleteBookedByNameUseCase: DeleteBookedByNameUseCase,

    ) {
      this.createBookedByNameUseCase = createBookedByNameUseCase;
    //   this.getBookedByNameByIdUsecase = getBookedByNameByIdUsecase;
    //   this.updateBookedByNameUsecase = updateBookedByNameUsecase;
      this.getAllBookedByNameUsecase = getAllBookedByNameUsecase;
      this.getNameByIdUseCase=getNameByIdUseCase;
      this.updateBookedByNameUseCase=updateBookedByNameUseCase;
      this.deleteBookedByNameUseCase = deleteBookedByNameUseCase;

    }
    async createBookedByName(req: Request, res: Response): Promise<void> {
  
        const bookedByNameData: BookedByNameModel = BookedByNameMapper.toModel(req.body);
    
        const newBookedByName: Either<ErrorClass, BookedByNameEntity> =
          await this.createBookedByNameUseCase.execute(bookedByNameData);
    
          newBookedByName.cata(
          (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
          (result: BookedByNameEntity) => {
            const resData = BookedByNameMapper.toEntity(result, true);
            return res.json(resData);
          }
        );
      }

    async getAllBookedByName(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        // Call the GetAllAdminsUsecase to get all admins
        const admins: Either<ErrorClass, BookedByNameEntity[]> =
          await this.getAllBookedByNameUsecase.execute();
    
        admins.cata(
          (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
          (bookedByNameList: BookedByNameEntity[]) => {
            const resData = bookedByNameList.map((bookedByName) => BookedByNameMapper.toEntity(bookedByName));
            return res.json(resData);
          }
        );
      }
      async updateName(req: Request, res: Response): Promise<void> {
        
          const nameId: string = req.params.nameId;
          const nameData: BookedByNameModel = req.body;
    
          // Get the existing admin by ID
          const existingName: Either<ErrorClass,BookedByNameEntity > | null =
            await this.getNameByIdUseCase.execute(nameId);
    
            existingName.cata(
                (error: ErrorClass) => {
                  res.status(error.status).json({ error: error.message });
                },
                async (result: BookedByNameEntity) => {
                  const resData = BookedByNameMapper.toEntity(result, true);
                  const updatedNameEntity: BookedByNameEntity = BookedByNameMapper.toEntity(
                    nameData,
                    true,
                    resData
                  );
                
            

            const updatedName: Either<ErrorClass, BookedByNameEntity> =
            await this.updateBookedByNameUseCase.execute(nameId, updatedNameEntity);
  
          updatedName.cata(
            (error: ErrorClass) => {
              res.status(error.status).json({ error: error.message });
            },
            (response: BookedByNameEntity) => {
              // Convert updatedAdmin from AdminEntity to plain JSON object using AdminMapper
              const responseData = BookedByNameMapper.toModel(response);
  
              // Send the updated admin as a JSON response
              res.json(responseData);
            }
          );
        }
            )
        }
        
         
     async deleteBookedByName(req:Request,res:Response):Promise<void>{
          const nameId:string=req.params.nameId
          console.log(nameId)

          const deleteName = await this.deleteBookedByNameUseCase.execute(nameId);

          deleteName.cata(
            (error: ErrorClass) =>
              res.status(error.status).json({ error: error.message }),

            (result: void) => {
              const resData = "Deleted successfully";
              console.log(resData)
              return res.json(resData);
            }
          );

        
     }
  }