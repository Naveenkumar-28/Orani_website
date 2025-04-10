import ContactMessage from "../../../models/ContactMessage";
export async function POST(req) {
    try {
        const data = await req.json()
        console.log(data);
        const newMessage = new ContactMessage(data)
        await newMessage.save()
        return Response.json({ message: 'Message Submitted' }, { status: 201 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}