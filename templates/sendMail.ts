import nodemailer from "nodemailer"

export async function sendMail(email: string, subject: string, html: string) {

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,      // Your email
            pass: process.env.EMAIL_PASS       // App password (if using Gmail)
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: html,
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error("Email send error:", error);
        throw new Error("Email failed to send")
    }
}