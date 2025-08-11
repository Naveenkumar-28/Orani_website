
import { useCallback, useMemo, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createSendMessage } from "@/utils/sendMessage/createSendMessage"
import { AppDispatch } from "@/app/redux/store"
import { getCartLocalStoreList } from "@/app/pages/(public_pages)/cart/utils"
import { mergeCartList } from "@/app/pages/(public_pages)/cart/redux"
import { useRouter } from "next/navigation"
import * as Yup from 'yup'
import { authLogin } from "@/app/redux/api"
import { loginSchema } from "../utils"
import { getWishListLocalStorage } from "@/app/pages/(public_pages)/wishlist/utils"
import { mergeWishList } from "@/app/pages/(public_pages)/wishlist/redux"

const initialState = {
    email: '',
    password: ''
}

export const useLoginHandler = () => {
    const [Errors, setErrors] = useState(initialState)
    const dispatch = useDispatch<AppDispatch>()
    const sendMessage = createSendMessage()
    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const loginFormData = useMemo(() => [
        {
            labelName: 'email',
            type: 'text',
            placeHolder: 'Enter your email',
            error: Errors.email,
            ref: emailRef
        },
        {
            labelName: 'password',
            type: 'password',
            placeHolder: 'Enter your password',
            error: Errors.password,
            ref: passwordRef
        }
    ], [Errors])

    // Submit form data
    const checkCredentials = useCallback(async (data: { email: string, password: string }) => {
        try {
            setIsLoading(true);
            const res = await dispatch(authLogin({ data })).unwrap();

            if (getCartLocalStoreList().length > 0) {
                await dispatch(mergeCartList()).unwrap();
            }
            if (getWishListLocalStorage().length > 0) {
                await dispatch(mergeWishList()).unwrap();
            }
            res?.user?.role == 'admin' ? router.push('/admin/dashboard') : router.push('/pages')
            sendMessage.success("Login successfully!");

        } catch (err: any) {
            setErrors(prev => ({
                ...prev,
                [err?.field]: err?.message
            }));
            sendMessage.error(err?.message || "Login failed please try again later");
        } finally {
            setIsLoading(false);
        }
    }, [getCartLocalStoreList, dispatch, sendMessage]);


    // Validate form data
    const loginFormValidateHandler = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data: { email: string, password: string } = { email: emailRef.current?.value || '', password: passwordRef.current?.value || '' }
            const loginDetails = await loginSchema.validate(data, { abortEarly: false });
            console.log({ loginDetails });
            checkCredentials(data)
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const err = error?.inner[0].message
                const name = error?.inner[0]?.path
                if (name) {
                    setErrors({
                        ...initialState,
                        [name]: err
                    })
                }
                sendMessage.error(err)
            }

        } finally {
            setErrors(initialState)
        }
    }, [checkCredentials, sendMessage])


    return { loginFormData, loginFormValidateHandler, isLoading }
}