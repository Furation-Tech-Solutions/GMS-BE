import nodemailer from "nodemailer";
import env from '@main/config/env';

interface EmailOptions {
    email: string;
    subject: string;
    message: string | null ;
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

    async sendEmail(emailOption:EmailOptions): Promise<void> {
        
        const mailOptions = {
            from: "reserfirst",
            to: emailOption.email,
            subject: emailOption.subject,
            html:emailOption.message || "",
        };

        try {
            // console.log(mailOptions,"mailoption")
            await this.transporter.sendMail(mailOptions);
            console.log("Email sent successfully",mailOptions);
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}

export default EmailService;