import { getPublicIdFromUrl, parseData, removeColudinaryImage, uploadFile } from "@/lib/cloudinary";
import { withAuth } from "@/lib/withAuth";
import { User } from "@/models";

export const POST = withAuth(async (req, _, user) => {
    try {
        const currentUser = await User.findById(user._id)
        if (!currentUser) return Response.json({ success: false, message: 'User not found' }, { status: 404 })
        const { buffer } = await parseData(req, { fileOptional: false, fileSizeLimit: 1 })
        if (!buffer) return Response.json({ success: false, message: 'No file uploaded' }, { status: 400 });

        const publicId = getPublicIdFromUrl(currentUser.imageUrl)
        await removeColudinaryImage(publicId)
        const result = await uploadFile('user_profile', buffer)

        if (!result || !result.secure_url) {
            return Response.json({ success: false, message: 'Profile pic upload failed' }, { status: 500 });
        }
        currentUser.imageUrl = result.secure_url
        await currentUser.save()
        const { _id, name, imageUrl, email, role } = currentUser
        const userData = { _id, name, imageUrl, email, role }
        return Response.json({ success: true, message: "Profile image changed successfully", user: userData });

    } catch (error) {
        console.error('Upload error:', error);
        return Response.json(
            { success: false, message: "Profile pic upload failed", error: (error as Error).message },
            { status: 500 }
        );
    }
})