import { connectToDatabase } from "@/lib/mongoDB";
import { ContactMessage } from "@/models";
import { contactFormSubmission } from "@/templates";

export const POST = async (req: Request) => {
    try {
        const { name, email, subject, message } = await req.json() || {}

        if (!name || !email || !subject || !message) {
            return Response.json({ success: false, message: 'Please provide name,email,subject and message are required fields' }, { status: 400 })
        }

        await connectToDatabase()

        const newMessage = new ContactMessage({ name, email, subject, message })

        await newMessage.save()

        await contactFormSubmission({ name, email, subject, message })

        return Response.json({ success: true, message: 'Message send successfully!' }, { status: 200 })
    } catch (error) {
        console.log((error as Error).message);

        return Response.json({ success: false, error, message: "Message send failed!" }, { status: 500 })
    }
}