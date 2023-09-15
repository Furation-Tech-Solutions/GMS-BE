import express, { Request, Response } from 'express';
import admin from '@main/config/firebase-sdk/firebase-config';
import { ErrorClass } from '@presentation/error-handling/api-error';
import { Either } from 'monet';
import { UserEntity } from '@domain/user-account/entities/user-account';
import { UserAccount } from '@data/user-account/models/user-account-model';

const users: {
  id: number;
  name: string;
  deviceToken: string;
  isLoggedIn: boolean;
}[] = [
  { id: 1, name: 'User 1', deviceToken: 'DEVICE_TOKEN_1', isLoggedIn: true },
  { id: 2, name: 'User 2', deviceToken: 'DEVICE_TOKEN_2', isLoggedIn: false },
  // Add more user objects here
];

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

exports.sendPushNotification = async  (req: Request, res: Response) => {

    const registrationToken = req.body.registrationToken;

    const users = await UserAccount.find({})

    console.log(users)


  const loggedInUsers = users.filter((user) => user.__v === true);

  loggedInUsers.forEach((user) => {
    const { firstName, lastName } = user;

    const payload = {
      notification: {
        title: 'New Notification',
        body: `Hello, ${firstName} ${lastName}! This is a broadcasted notification.`,
      },
    };

    // Send the notification to the user's device
    admin.messaging().sendToDevice(registrationToken, payload, notification_options)
    .then((response: any) => {
        if (response.results[0].messageId == null) {
          console.log(response.results[0].error);
          res.status(400).send(response.results[0].error);
        } else {
          console.log(payload);
          res.status(200).send('Notification sent successfully with messageId: ' + response.results[0].messageId);
        }
      })
      .catch((error: any) => {
        console.log(error);
        res.status(400).send(error);
      });
  });

  res.status(200).json({ message: 'Notifications sent to logged-in users' });
};


