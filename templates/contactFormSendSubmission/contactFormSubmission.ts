import path from "path";
import ejs from 'ejs'
import { sendMail } from "@/templates/sendMail";


export const contactFormSubmission = async (data: { email: string, name: string, subject: string, message: string }) => {

    const { email, message, name, subject } = data
    const formattedName = name.split('').map(((i, index) => { return 0 == index ? i.toUpperCase() : i.toLowerCase() })).join('')

    const templatePath = path.join(process.cwd(), "templates", "contactFormSendSubmission", "contactFormSendSubmission.ejs");

    const html = await ejs.renderFile(templatePath, {
        name: formattedName,
        subject,
        email,
        message
    });

    const myEmail = process.env.EMAIL_USER || "naveenkumardass011@gmail.com"

    await sendMail(myEmail, `Hi Naveen ,📩 New contact form submission received`, html)
}