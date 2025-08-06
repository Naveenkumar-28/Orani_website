import { mergeCartList } from "@/app/tempPages/(public_pages)/cart/redux"
import { getCartLocalStoreList } from "@/app/tempPages/(public_pages)/cart/utils"
import { mergeWishList } from "@/app/tempPages/(public_pages)/wishlist/redux"
import { getWishListLocalStorage } from "@/app/tempPages/(public_pages)/wishlist/utils"
import { authEmailResend, authEmailverify } from "@/app/redux"
import { AppDispatch } from "@/app/redux/store"
import { createSendMessage } from "@/utils"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"
import { useDispatch } from "react-redux"


export const useEmailVerificationhandler = ({ email }: { email: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const verifyCodeRef = useRef<HTMLInputElement | null>(null)
    const sendMessage = createSendMessage()
    const [timer, setTimer] = useState(0)
    const [timerStart, setTimerStart] = useState<boolean>(false)

    let timeInterval = useRef<NodeJS.Timeout | null>(null); // Define outside the function

    // Start the timer when the resend button is clicked
    const resendTimer = useCallback(() => {
        setTimerStart(true)
        setTimer(30)
        timeInterval.current ? clearInterval(timeInterval.current) : null // Clear any existing interval
        timeInterval.current = setInterval(() => {
            setTimer(prev => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    timeInterval.current ? clearInterval(timeInterval.current) : null
                    setTimerStart(false)
                    return 0;
                }
            });
        }, 1000);
    }, [])

    // Function to check the verification code details
    const checkDetails = useCallback((code: string) => {
        if (!code) {
            sendMessage.error("Please enter verification code")
            return false
        }
        if (code.length < 6) {
            sendMessage.error("Verification code must be at least 6 digits")
            return false
        }
        if (code.length > 6) {
            sendMessage.error("Verification code cannot exceed 6 digits")
            return false
        }

        return true
    }, [])

    //Funtion to handle email verification
    const emailVerifyHandler = useCallback(async () => {
        const code = verifyCodeRef.current?.value?.trim() || ''
        if (!checkDetails(code)) return setIsError(true)
        const data = { code, email }
        setIsLoading(true)
        setIsError(false)
        try {
            await dispatch(authEmailverify({ data })).unwrap()
            if (getCartLocalStoreList().length > 0) {
                await dispatch(mergeCartList()).unwrap()
            }
            if (getWishListLocalStorage().length > 0) {
                await dispatch(mergeWishList()).unwrap()
            }
            router.push('/pages')
            sendMessage.success("Email verified successfully")
        } catch (error) {
            console.log(error);
            if (error && typeof error === "object" && "message" in error) {
                sendMessage.error((error as { message?: string }).message || "Email verification failed")
            } else {
                sendMessage.error("Email verification failed")
            }
            setIsError(true)
        } finally {
            setIsLoading(false)
        }

    }, [email])

    // Function to resend the verification code
    const resendVerificationCode = useCallback(async () => {
        setResendLoading(true)
        setIsError(false)
        dispatch(authEmailResend({ email }))
            .unwrap()
            .then(() => {
                sendMessage.success("Email verification Code send successfully")
                resendTimer()
            }).catch(() => {
                sendMessage.error("Email verification code send failed")
                setIsError(true)
            }).finally(() => {
                setIsLoading(false)
                setResendLoading(false)
            })
    }, [email, resendTimer])

    return { timer, resendVerificationCode, emailVerifyHandler, isLoading, timerStart, verifyCodeRef, isError, resendLoading }
}