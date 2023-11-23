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
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
interface EmailOptions {
    from:string;
    email: string;
    subject: string;
    message: string | null  ;
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

    async sendEmail(mailOptions:EmailOptions):Promise<void> {
    
        const params = {
            // Source: "shahzad.shaikh@furation.tech", // Change to your SES verified email address
            Source: mailOptions.from, // Change to your SES verified email address
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
            const command = new SendEmailCommand(params);

            const response = await this.sesClient.send(command);
            
        } catch (error) {
            throw error;
        }
    }
}
export default EmailService;
