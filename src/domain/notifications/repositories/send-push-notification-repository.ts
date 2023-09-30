
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserEntity } from "@domain/user-account/entities/user-account";

export interface NotificationRepository {
    sendPushNotification(): Promise<Either<ErrorClass, UserEntity[]>> 
}
