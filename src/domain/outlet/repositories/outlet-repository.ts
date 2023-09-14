import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import {Either} from "monet";
import {ErrorClass} from "@presentation/error-handling/api-error"
export interface OutletRepository {
  createOutlet(outlet: OutletModel): Promise<Either<ErrorClass, OutletEntity>>;
  getOutletById(id: string): Promise<Either<ErrorClass, OutletEntity>>;
  getOutlets(): Promise<Either<ErrorClass, OutletEntity[]>>;
  updateOutlet(
    id: string,
    outlet: OutletModel
  ): Promise<Either<ErrorClass, OutletEntity>>;
  deleteOutlet(id: string): Promise<Either<ErrorClass, void>>;
  suspendOutlet(id: string): Promise<Either<ErrorClass, void>>;
  reactivateOutlet(id: string): Promise<Either<ErrorClass, any>>;
}
