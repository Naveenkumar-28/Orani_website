import api from "@/lib/axios"
import { createSendMessage } from "@/utils/sendMessage/createSendMessage"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"

const useSignoutHandler = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const sendMessage = createSendMessage()
    const dispatch = useDispatch()

    const signOutHandler = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await api.get('/auth/logout')
            if (response.data.success) {
                router.replace('/auth/login')
            }
        } catch (error) {
            console.log(error);
            sendMessage.error('Somthing went wrong!')
        } finally {
            setIsLoading(false)
        }
    }, [])

    return { signOutHandler, isLoading }
}

export { useSignoutHandler };