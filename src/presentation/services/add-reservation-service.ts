import { NextFunction, Request, Response } from "express";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CreateAddReservationUsecase } from "@domain/add-reservation/usecases/create-add-reservation";
import { DeleteAddReservationUsecase } from "@domain/add-reservation/usecases/delete-add-reservation";
import { GetAddReservationByIdUsecase } from "@domain/add-reservation/usecases/get-add-reservation-by-id";
import { GetAllAddReservationUsecase } from "@domain/add-reservation/usecases/get-all-add-reservation";
import { UpdateAddReservationUsecase } from "@domain/add-reservation/usecases/update-add-reservation";
import {
  AddReservationEntity,
  AddReservationMapper,
  AddReservationModel,
} from "@domain/add-reservation/entities/add-reservation";
import { ClientServices } from "./client-services";
import { reservationStatusEmailTemplate } from "./email-template";
import EmailService from "./send-mail";

export class AddReservationServices {
  private readonly createAddReservationUsecase: CreateAddReservationUsecase;
  private readonly deleteAddReservationUsecase: DeleteAddReservationUsecase;
  private readonly getAddReservationByIdUsecase: GetAddReservationByIdUsecase;
  private readonly getAllAddReservationUsecase: GetAllAddReservationUsecase;
  private readonly updateAddReservationUsecase: UpdateAddReservationUsecase;
  private readonly emailService:EmailService;


  constructor(
    createAddReservationUsecase: CreateAddReservationUsecase,
    deleteAddReservationUsecase: DeleteAddReservationUsecase,
    getAddReservationByIdUsecase: GetAddReservationByIdUsecase,
    getAllAddReservationUsecase: GetAllAddReservationUsecase,
    updateAddReservationUsecase: UpdateAddReservationUsecase,
    emailService: EmailService

  ) {
    this.createAddReservationUsecase = createAddReservationUsecase;
    this.deleteAddReservationUsecase = deleteAddReservationUsecase;
    this.getAddReservationByIdUsecase = getAddReservationByIdUsecase;
    this.getAllAddReservationUsecase = getAllAddReservationUsecase;
    this.updateAddReservationUsecase = updateAddReservationUsecase;
    this.emailService = emailService

  }

  async createAddReservation(req: Request, res: Response): Promise<void> {
    try{
    const user=req.user

    const newReservationData={
      ...req.body,
      createdBy:user._id,
      updatedBy:user._id
    }
    const addReservationData: AddReservationModel =
      AddReservationMapper.toModel(newReservationData);

    const newAddReservation: Either<ErrorClass, AddReservationEntity> =
      await this.createAddReservationUsecase.execute(addReservationData);

    newAddReservation.cata(
      async (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      async (result: AddReservationEntity) => {

        const resData = AddReservationMapper.toEntity(result, true);
        console.log(resData,"resData in reservation")

        //called the get reservation by id to send populated data to email template
        const addReservationId:string| undefined = resData._id;
        if (addReservationId) {

        const addReservation: Either<ErrorClass, AddReservationEntity> =
          await this.getAddReservationByIdUsecase.execute(addReservationId);
    
        addReservation.cata(
          async (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
          async (result: AddReservationEntity) => {
            if (!result) {
              return res.json({ message: "Reservation not found." });
            }
            console.log(result,"reservation of perticular id")
            // const reservtionData = AddReservationMapper.toEntity(result);
            // return res.json(resData);
              if (typeof result.client==="object" && 'email' in result.client) {
                const clientWithEmail = result.client as { email: string };
              const emailOption={
          // email:clientWithEmail.email ,
          email:"shehzadmalik123.sm@gmail.com",
          subject:reservationStatusEmailTemplate.subject,
          message:reservationStatusEmailTemplate.message(result)
           }
      
          await this.emailService.sendEmail(emailOption);
         }
          else {
            // Handle the case where client or client.email is undefined
            return res.json({ message: "Client information is missing." });
          }
          }
        );
        }

         return  res.json(resData);
        

      }
    )
    }
    catch(err){
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteAddReservation(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;

    const deletedAddReservation: Either<ErrorClass, void> =
      await this.deleteAddReservationUsecase.execute(addReservationId);

    deletedAddReservation.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({
          message: "Reservation deleted successfully.",
        });
      }
    );
  }

  async getAddReservationById(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;

    const addReservation: Either<ErrorClass, AddReservationEntity> =
      await this.getAddReservationByIdUsecase.execute(addReservationId);

    addReservation.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AddReservationEntity) => {
        if (!result) {
          return res.json({ message: "Reservation not found." });
        }
        const resData = AddReservationMapper.toEntity(result);
        return res.json(resData);
      }
    );
  }

  async getAllAddReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const addReservations: Either<ErrorClass, AddReservationEntity[]> =
      await this.getAllAddReservationUsecase.execute();

    addReservations.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AddReservationEntity[]) => {
        const responseData = result.map((addReservation) =>
          AddReservationMapper.toEntity(addReservation)
        );
        return res.json(responseData);
      }
    );
  }

  async updateAddReservation(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;
    const user=req.user

    const newReservationData={
      ...req.body,
      updatedBy:user._id
    }
    const addReservationData: AddReservationModel = newReservationData;

    const existingAddReservation: Either<ErrorClass, AddReservationEntity> =
      await this.getAddReservationByIdUsecase.execute(addReservationId);
    existingAddReservation.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (existingAddReservationData: AddReservationEntity) => {
        if (existingAddReservationData === null) {
          return res.json({ message: "Reservation not found." });
        }
        const updatedAddReservationEntity: AddReservationEntity =
          AddReservationMapper.toEntity(
            addReservationData,
            true,
            existingAddReservationData
          );
        const updatedAddReservation: Either<ErrorClass, AddReservationEntity> =
          await this.updateAddReservationUsecase.execute(
            addReservationId,
            updatedAddReservationEntity
          );
        updatedAddReservation.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (result: AddReservationEntity) => {
            const resData = AddReservationMapper.toEntity(result, true);
            res.json(resData);
          }
        );
      }
    );
  }
}
