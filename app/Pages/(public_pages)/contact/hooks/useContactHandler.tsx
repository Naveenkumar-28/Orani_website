import { CONTACT_FORM_ACTIONS, sendMessageThunk, setMessageData } from "../redux"
import React, { useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { contactUsSchema } from "../utils"
import { ValidationError } from "yup"
import { contactUsType } from "../types"
import { AppDispatch, RootState } from "@/app/redux/store"
import { createSendMessage } from "@/utils"

const initialState = {
    name: '',
    email: '',
    subject: '',
    message: ''
}

export const useContactHandler = () => {
    const [Errors, setErrors] = useState(initialState)
    const dispatch = useDispatch<AppDispatch>()
    const sendMessage = createSendMessage()

    const { contactUs, isLoading } = useSelector((state: RootState) => state.ContactUs)

    //Submit Handler
    const submitHandler = async (data: contactUsType) => {
        try {
            await dispatch(sendMessageThunk({ data })).unwrap()
            sendMessage.success('Message send successfully')

        } catch (error) {
            sendMessage.error('Message send failed')
        }
    }

    //Form validation
    const validateContactForm = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault()
        setErrors(initialState)
        try {
            const data = await contactUsSchema.validate(contactUs, { abortEarly: false })
            if (data) {
                submitHandler(data)
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                const name = error.inner[0].path
                const err = error.inner[0].message
                if (name) {
                    setErrors((prev) => {
                        return {
                            ...initialState,
                            [name]: err
                        }
                    })
                    sendMessage.error(err)
                }
            }


        }
    }, [dispatch, submitHandler])

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        const name = e.target.name.toUpperCase()

        if (name in CONTACT_FORM_ACTIONS) {
            const type = CONTACT_FORM_ACTIONS[name as keyof typeof CONTACT_FORM_ACTIONS];

            dispatch(setMessageData({ type, payload: value }))
        }

    }, [dispatch])

    //ContactUs form data
    const contactFormData = useMemo(() => [
        {
            name: 'name',
            element: 'input',
            placeholder: "Your Name",
            value: contactUs.name,
            error: Errors.name,
            onChange: onChangeHandler
        },
        {
            name: 'email',
            element: 'input',
            placeholder: "Your Email",
            value: contactUs.email,
            error: Errors.email,
            onChange: onChangeHandler
        },
        {
            name: 'subject',
            element: 'input',
            placeholder: "Subject",
            error: Errors.subject,
            value: contactUs.subject,
            onChange: onChangeHandler
        },
        {
            name: 'message',
            element: 'textarea',
            placeholder: "Message",
            value: contactUs.message,
            error: Errors.message,
            onChange: onChangeHandler
        }

    ], [dispatch, Errors, contactUs, onChangeHandler])


    return { isLoading, contactFormData, validateContactForm }
}