
import { useDispatch } from "react-redux"
import React, { useCallback, useMemo, useRef, useState } from "react";
import { createSendMessage } from "@/utils/sendMessage/createSendMessage";
import { registerSchema } from "../utils";
import * as Yup from 'yup'
import { AppDispatch } from "@/app/redux/store";
import { authRegister } from "@/app/redux";

const initialState = {
    name: '',
    email: '',
    password: ''
}

export const useRegisterHandler = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [Errors, setErrors] = useState(initialState)
    const dispatch = useDispatch<AppDispatch>()
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const sendMessage = createSendMessage()
    const [emailVerificationPending, setEmailVerificationPending] = useState(false)

    const registerFormData = useMemo(() => ([
        {
            labelName: 'name',
            type: 'text',
            placeHolder: 'Enter your name',
            error: Errors.name,
            ref: nameRef
        },
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
    ]), [Errors])

    const registerFormvalidation = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(initialState)
        try {
            const data = { name: nameRef.current?.value || '', email: emailRef.current?.value || '', password: passwordRef.current?.value || '' }
            const verifiedData = await registerSchema.validate(data, { abortEarly: false });
            console.log({ verifiedData });
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

        }
    }, [])

    // Submit form data
    const checkCredentials = useCallback(async (data: { name: string, email: string, password: string }) => {
        setIsLoading(true)
        dispatch(authRegister({ data }))
            .unwrap()
            .then(() => {
                console.log("successs");
                setEmail(data.email)
                setEmailVerificationPending(true)
                sendMessage.success("Verification code send to your email address")
            }).catch((err) => {
                sendMessage.error(err || "Somthing went wrong!")
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])



    return { registerFormvalidation, registerFormData, email, isLoading, emailVerificationPending }
}