import BlogList from "../../../models/BlogList";

// export async function POST(req) {
//     const data = await req.json()
//     const blog = await BlogList.insertMany(data)
//     console.log(blog);


//     return Response.json({ message: "Successfully saved to database" }, { status: 201 })
// }

export async function GET(req) {
    try {

        const data = await BlogList.find()
        console.log(data);


        return Response.json(data, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })

    }
}