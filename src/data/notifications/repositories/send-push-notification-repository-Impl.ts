
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { NotificationDataSource } from "../datasource/send-push-notification-data";
import { UserEntity } from "@domain/user-account/entities/user-account";
import { NotificationRepository } from "@domain/notifications/repositories/send-push-notification-repository";



export class NotificationRepositoryImpl implements NotificationRepository {
    private readonly notificationDataSource: NotificationDataSource;
  
    constructor(notificationDataSource: NotificationDataSource) {
      this.notificationDataSource = notificationDataSource;
    }
    async sendPushNotification(
      ): Promise<Either<ErrorClass, UserEntity[]>> {
        try {
          let user = await this.notificationDataSource.getLoggedInUsers();
          return Right<ErrorClass, UserEntity[]>(user);
        } catch (error) {
          if (error instanceof ApiError && error.status === 409) {
            return Left<ErrorClass, UserEntity[]>(ApiError.nameExist());
          }
          return Left<ErrorClass, UserEntity[]>(ApiError.badRequest());
        }
      }
   
}