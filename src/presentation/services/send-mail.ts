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
            host: env.mailhost,
            port: 465,
            secure: true,
            auth: {
                user: env.user,
                pass: env.password
            }
        });
    }

    async sendEmail(options: EmailOptions): Promise<void> {
        const mailOptions = {
            from: env.user,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}

export default EmailService;

