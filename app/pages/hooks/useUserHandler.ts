import { useCallback, useRef, useState } from "react"
import { authLogout, changeProfilePic } from '@/app/redux'
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/app/redux/store"
import { createSendMessage } from "@/utils"
import { useUserData } from "@/hooks"
import { useRouter } from "next/navigation"

export const useUserhandler = ({ logoutConfirmationCloseHandler }: { logoutConfirmationCloseHandler: () => void }) => {
    const dispatch = useDispatch<AppDispatch>()
    const sendMessage = createSendMessage()
    const { user } = useUserData()
    const [isShow, setIsShow] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()
    const profileRef = useRef(null);
    const [isImageUploading, setIsImageUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //Logout functionality
    const logoutHandler = useCallback(async () => {
        logoutConfirmationCloseHandler()
        setIsLoading(true)
        try {
            await dispatch(authLogout()).unwrap()
            sendMessage.success("Logout successfully!")
            router.replace('/auth/login')
        } catch (error) {
            sendMessage.error("logout failed")
        } finally {
            setIsLoading(false)
        }
    }, [dispatch, router])

    const handleClickOutside = (event: MouseEvent) => {
        const refCurrent = profileRef.current as HTMLDivElement | null;

        if (refCurrent && !refCurrent.contains(event.target as Node)) {
            setIsShow(false);
        }
    };

    // Trigger file input
    const changeImageHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    //Change image functionality
    const profilePicUpload = useCallback(async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        setIsImageUploading(true)
        try {
            await dispatch(changeProfilePic({ formData }))
            sendMessage.success("Profile Pic changed successfully")
        } catch (error) {
            sendMessage.error("Profile Pic upload failed")
        } finally {
            setIsImageUploading(false)
        }
    }, [])

    // Check profile pic size and type
    const checkProfilePicHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const fileSize = file?.size
            const maxSizeInBytes = 1 * 1024 * 1024
            if (!(fileSize < maxSizeInBytes)) return sendMessage.error('File size exceeds 1MB')
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
            if (!allowedTypes.includes(file.type)) {
                return sendMessage.error('Invalid file type. Only JPEG, PNG, and WEBP are allowed');
            }
            profilePicUpload(file)
        }
    }, [dispatch, user])

    return { isLoading, isImageUploading, changeImageHandler, checkProfilePicHandler, logoutHandler, handleClickOutside, fileInputRef, isShow, setIsShow, profileRef }
}