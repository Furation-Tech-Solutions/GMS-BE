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
    async execute(): Promise<any> {
        
         const loggedInUsers = await this.notificationRepository.sendPushNotification();
        
        const results: { messageId: string; deviceId: string }[] = [];

        // for (const user of loggedInUsers) {
        //     if (user.firebaseDeviceToken && user.firebaseDeviceToken.length > 0) {
        //       const payload = {
        //         notification: {
        //           title: title,
        //           body: `Hello! This is a broadcasted notification.`,
        //         },
        //       };
      
        //       const tokens = user.firebaseDeviceToken;
      
              
      
        //       try {
        //         const response = await admin.messaging().sendMulticast({
        //           tokens: tokens,
        //           notification: payload.notification,
        //           options: notificationOptions,
        //         });
      
        //         const successResults = response.responses.filter((result: any) => result.success);
        //         const failureResults = response.responses.filter((result: any) => !result.success);
      
        //         if (failureResults.length > 0) {
        //           console.error('Failed to send some messages:', failureResults);
        //         }
      
        //         results.push(
        //           ...successResults.map((result: any) => ({
        //             messageId: result.messageId,
        //             deviceId: result.canonicalRegistrationToken || result.token,
        //           }))
        //         );
        //       } catch (error) {
        //         console.error('Error sending multicast message:', error);
        //         res.status(500).json({ error: 'Internal server error' });
        //         return;
        //       }
        //     }
        //   }
    }
}