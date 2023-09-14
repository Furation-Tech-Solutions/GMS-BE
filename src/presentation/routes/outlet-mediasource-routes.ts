
import { Router } from "express"; // Correctly import Request and Response
import { MediaOutletService,} from "@presentation/services/mediadata-services";
import { GetPreSignedUrl } from "@domain/outlet/usecases/get-presignedurl";
import { DeleteBrandLogo } from "@domain/outlet/usecases/delete-brandlogo";
import { OutletMediaDataSourceImpl } from "@data/aws/datasources/mediadata-source";
import { OutletMediaRepositoryImpl } from "@data/aws/repositories/outlet-media-repository";

// Create an instance of the OutletDataSourceImpl and pass the mongoose connection
// const outletDataSource = new OutletDataSourceImpl(mongoose.connection);
const outletDataSource = new OutletMediaDataSourceImpl();

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
const outletRepository = new OutletMediaRepositoryImpl(outletDataSource);

// Create instances of the required use cases and pass the OutletRepositoryImpl
const outletMediaUsecase = new GetPreSignedUrl(outletRepository);
const deleteBrandLogoUsecase = new DeleteBrandLogo(outletRepository);

// Initialize OutletService and inject required dependencies
const outletMediaService = new MediaOutletService(
  outletMediaUsecase,
  deleteBrandLogoUsecase
);

// Create an Express router
export const mediaRoutes = Router();


mediaRoutes.get(
  "/getpresignedurl/:outletId",
  outletMediaService.getPreSignedUrl.bind(outletMediaService)
);
mediaRoutes.delete(
  "/deleteMedia/",
  outletMediaService.deletePreSignedUrl.bind(outletMediaService)
)





