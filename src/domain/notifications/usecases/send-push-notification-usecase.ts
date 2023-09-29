import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import { NotificationRepository } from "../repositories/send-push-notification-repository";

export interface NotificationUsecase {
    execute: () => Promise<Either<ErrorClass, any>>;
}

export class Notification implements NotificationUsecase {
    private readonly notificationRepository: NotificationRepository;
    constructor(notificationRepository: NotificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async execute(): Promise<Either<ErrorClass, any>> {
        return await this.notificationRepository.sendPushNotification();
    }
}