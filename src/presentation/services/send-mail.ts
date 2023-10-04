import nodemailer from "nodemailer";
import env from '@main/config/env';

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}

class EmailService {
    private transporter: nodemailer.Transporter;
 
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "masaischoolproject@gmail.com",
                pass: "pssmfzaekhcypqlj"
            }
        });
    }

    async sendEmail(emailOption:EmailOptions): Promise<void> {
        const mailOptions = {

            from: "masaischoolproject@gmail.com",

            to: emailOption.email,
            subject: emailOption.subject,
            text:emailOption.message,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            // console.log("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}

export default EmailService;
