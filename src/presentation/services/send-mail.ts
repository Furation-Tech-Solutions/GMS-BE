// import nodemailer from "nodemailer";
// import env from '@main/config/env';

// interface EmailOptions {
//     email: string;
//     subject: string;
//     message: string | null ;
// }

// class EmailService {
//     private transporter: nodemailer.Transporter;

//     constructor() {
//         this.transporter = nodemailer.createTransport({
//             host: env.mailhost,
//             port: 465,
//             secure: true,
//             auth: {
//                 user: env.user,
//                 pass: env.password
//             }
//         });
//     }

//     async sendEmail(emailOption:EmailOptions): Promise<void> {

//         const mailOptions = {
//             from: "reserfirst",
//             to: emailOption.email,
//             subject: emailOption.subject,
//             html:emailOption.message || "",
//         };

//         try {
//             // console.log(mailOptions,"mailoption")
//             await this.transporter.sendMail(mailOptions);
//             console.log("Email sent successfully",mailOptions);
//         } catch (error) {
//             console.error("Error sending email:", error);
//             throw error;
//         }
//     }
// }

// export default EmailService;

// const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandOutput,
} from "@aws-sdk/client-ses";
interface EmailOptions {
  from: string;
  email: string;
  subject: string;
  message: string | null;
}

class EmailService {
  private readonly sesClient: SESClient;
  constructor() {
    this.sesClient = new SESClient({
      region: "ap-south-1",
      credentials: {
        accessKeyId: "AKIA2DLSFCNA4PT4FYLJ",
        secretAccessKey: "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",
      },
    });
  }

  async sendEmail(mailOptions: EmailOptions): Promise<SendEmailCommandOutput> {
    console.log(mailOptions, "mailoptions");

    let sender: string = "";
    if (mailOptions.from == "nixon.dsouza@reserve1st.com") {
      sender = "estellamumbai@reserve1st.com";
    } else {
      sender = `${mailOptions.from}`;
    }

    const params = {
      // Source: "shahzad.shaikh@furation.tech", // Change to your SES verified email address
      Source: sender, // Change to your SES verified email address
      Destination: {
        ToAddresses: [mailOptions.email],
      },
      Message: {
        Subject: {
          Data: mailOptions.subject,
        },
        Body: {
          // Text: {
          //     Data: mailOptions.message || "",
          //     Charset: "UTF-8",
          // }
          Html: {
            Data: mailOptions.message || "", // Assuming message is in HTML format
            Charset: "UTF-8",
          },
        },
      },
    };

    try {
      console.log(params, "inside try block");
      const command = new SendEmailCommand(params);
      const response: SendEmailCommandOutput = await this.sesClient.send(
        command
      );

      return response;
    } catch (error: any) {
      console.log(error.message, "error inside ses service");
      return error;
    }
  }
}
export default EmailService;
