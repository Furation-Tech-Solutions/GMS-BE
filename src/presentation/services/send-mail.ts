import nodemailer from "nodemailer";
import env from '@main/config/env'

// Generate SMTP service account from ethereal.email
interface data {
    email: string;
    subject: string;
    message: string;
    // html: string;
}

export async function sendEmail(options: data): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: env.mailhost,
        port: 465, // Change the port to 465 for secure SMTP with Gmail
        secure: true, // Use SSL/TLS for a secure connection
        auth: {
            user: env.user,
            pass: env.password
        }
    });

    const mailOptions = {
        from: env.user,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

