import { connectToDatabase } from '../../../lib/mongoDB'
import blogList from "../../../models/BlogList";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit')) || 10
    console.log(page, search, limit)
    try {
        await connectToDatabase()
        const qurery = {}
        if (search) qurery.category = { $regex: search, $options: "i" }
        const blogs = await blogList.find(qurery).skip((page - 1) * limit).limit(limit).select()
        const total = await blogList.countDocuments(qurery)

        // Formatting date and adding comments count to each blog document
        const formattedBlogList = blogs.map((blog) => {
            const blogOBJ = blog.toObject()
            return {
                ...blogOBJ,
                createdAt: new Date(blogOBJ.createdAt)?.toDateString()?.split(' ')?.splice(1)?.join(' '),
                comments: blogOBJ?.comments?.length || 0
            }
        })

        if (!search) {
            const blogs = await blogList.find().sort({ createdAt: -1 })
            const categoryList = {}
            blogs.map((blog) => {
                const blogObj = blog.toObject()
                categoryList[blogObj.category] = (categoryList[blogObj.category] || 0) + 1
            })
            const category = Object.keys(categoryList).map((category) => ({ name: category, count: categoryList[category] }))
            const recentBlog = blogs.slice(0, 3).map((blog) => {
                const blogOBJ = blog.toObject()
                return {
                    ...blogOBJ,
                    createdAt: new Date(blogOBJ.createdAt)?.toDateString()?.split(' ')?.splice(1)?.join(' '),
                    comments: blogOBJ?.comments?.length || 0
                }
            })
            return Response.json({ success: true, blogs: formattedBlogList, recentBlog, total, category }, { status: 200 })
        }

        return Response.json({ success: true, blogs: formattedBlogList, total }, { status: 200 })
    } catch (error) {

        console.log(error?.message);
        return Response.json({ error: "Something went wrong!" }, { status: 500 }) // Internal Server Error
    }

}