import { BookedByNameDataSourceImpl } from "@data/booked-by-name/datasources/booked-by-names-data-source";
import { BookedByNameRepositoryImpl } from "@data/booked-by-name/repositories/booked-by-name-repository-impl";
import { CreateBookedByName } from "@domain/booked-by-name/usecase/create-booked-by-name";
import { DeleteBookedByName } from "@domain/booked-by-name/usecase/delete-booked-by-name";
import { GetAllBookedByName } from "@domain/booked-by-name/usecase/get-all-booked-by-name";
import { GetNameById } from "@domain/booked-by-name/usecase/get-booked-by-name-by-id";
import { UpdateBookedByName } from "@domain/booked-by-name/usecase/update-booked-by-name";
import { BookedByNameService } from "@presentation/services/booked-by-name-services";
import { Router } from "express"; // Correctly import Request and Response
import mongoose from "mongoose";


const mongooseConnection = mongoose.connection;
// Create an instance of the OutletDataSourceImpl and pass the mongoose connection
const peopleDataSource = new BookedByNameDataSourceImpl(mongooseConnection);

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
const peopleRepository = new BookedByNameRepositoryImpl(peopleDataSource);

// Create instances of the required use cases and pass the OutletRepositoryImpl

const createBookedByNameUseCase = new CreateBookedByName(peopleRepository)
const getPeopleBookedByNameUseCase = new GetAllBookedByName(peopleRepository);
const getNameByIdUseCase=new GetNameById(peopleRepository)
const updateBookedByNameUseCase=new UpdateBookedByName(peopleRepository)
const deleteBookedByNameUseCase=new DeleteBookedByName(peopleRepository)


const bookedByNameService = new BookedByNameService(
  createBookedByNameUseCase,
  getPeopleBookedByNameUseCase,
  getNameByIdUseCase,
  updateBookedByNameUseCase,
  deleteBookedByNameUseCase
);

export const bookedByNameRouter=Router()


bookedByNameRouter.post(
    "/addName",bookedByNameService.createBookedByName.bind(bookedByNameService)
)
bookedByNameRouter.get(
  "/getName",bookedByNameService.getAllBookedByName.bind(bookedByNameService)
)

 bookedByNameRouter.patch(
     "/update/:nameId",bookedByNameService.updateName.bind(bookedByNameService)
      )

 bookedByNameRouter.delete(
       "/delete/:nameId",
       bookedByNameService.deleteBookedByName.bind(bookedByNameService)
     );


