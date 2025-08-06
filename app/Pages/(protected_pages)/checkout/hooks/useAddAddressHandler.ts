import { useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editAddress, fetchAddresses, setAddress, uploadAddressThunk } from "../redux"
import { AppDispatch, RootState } from "@/app/redux/store"
import * as Yup from 'yup'
import { addressSchema } from "../utils"
import { createSendMessage } from "@/utils"
import { AddressFormData, AddressFormType } from "../types"
import { ADDRESS_TYPE } from "../constants"
import { useUserData } from "@/hooks"

type ErrorResponse = {
    success: false;
    message: string;
    error?: string;
}

type Props = {
    EditModelCloseHandler: () => void;
    addNewModelCloseHandler: () => void
}

const initialState = {
    firstName: '',
    lastName: '',
    city: '',
    postcode: '',
    mobileNumber: '',
    street: '',
}
export const useAddAddressHandler = ({ addNewModelCloseHandler, EditModelCloseHandler }: Props) => {
    const [Errors, setErrors] = useState(initialState)
    const { page, addNewAddress, isLoading, addresses } = useSelector((state: RootState) => state.Addresses)
    const { user, isSignedIn } = useUserData()
    const sendMessage = createSendMessage()
    const dispatch = useDispatch<AppDispatch>()

    // Handler to validate address form
    const validateAddressForm = useCallback(async (callback: (value: AddressFormType) => void) => {
        setErrors(initialState)
        try {
            const addressDetails = await addressSchema.validate(addNewAddress, { abortEarly: false });
            if (isSignedIn && user) {
                callback(addressDetails)
            }
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
    }, [addNewAddress, isSignedIn, user, initialState])

    // Handler to upload address
    const uploadAddressHandler = useCallback(async (address: AddressFormType) => {

        addNewModelCloseHandler()
        try {
            const response = await dispatch(uploadAddressThunk({ address })).unwrap()
            console.log({ response });
            let prevPage = page
            for (let i = 1; i <= prevPage; i++) {
                dispatch(fetchAddresses({ page: i, limit: 5, refresh: true }))
            }
            sendMessage.success("Address added successfully")
        } catch (error) {
            console.log({ error })
            const err = error as ErrorResponse
            if (err?.success === false) {
                sendMessage.error(err.message || "Validation failed")
            } else {
                sendMessage.error("Something went wrong")
            }
        }

    }, [addNewModelCloseHandler, dispatch, page])

    // Handler to edit address
    const editAddressHandler = useCallback(async (address: AddressFormType) => {
        const matchedAddress = addresses.find((item) => item.isChecked == true)
        if (!matchedAddress) return
        EditModelCloseHandler()
        try {
            const response = await dispatch(editAddress({ _id: matchedAddress?._id, address })).unwrap()
            console.log({ response });
            sendMessage.success("Address edited successfully")
        } catch (error) {
            console.log({ error })
            const err = error as ErrorResponse
            if (err?.success === false) {
                sendMessage.error(err.message || "Validation failed")
            } else {
                sendMessage.error("Something went wrong")
            }
        }

    }, [EditModelCloseHandler, dispatch, addresses])

    // Address form data
    const addressformData: AddressFormData = useMemo(() => ({
        firstName: {
            title: 'first name',
            error: Errors?.firstName,
            onChange: (e) => dispatch(setAddress({ type: ADDRESS_TYPE.FIRSTNAME, payload: e.target.value })),
            value: addNewAddress.firstName
        },
        lastName: {
            title: 'last name',
            error: Errors?.lastName,
            onChange: (e) => dispatch(setAddress({ type: ADDRESS_TYPE.LASTNAME, payload: e.target.value })),
            value: addNewAddress.lastName
        },
        country: {
            title: 'State / Country',
            defaultValue: 'india',
            readOnly: true
        },
        city: {
            title: "Town / City",
            error: Errors?.city,
            value: addNewAddress.city,
            onChange: (e) => dispatch(setAddress({ type: ADDRESS_TYPE.CITY, payload: e.target.value }))
        },
        street: {
            title: 'Street Address',
            error: Errors?.street,
            onChange: (e) => dispatch(setAddress({ type: ADDRESS_TYPE.STREET, payload: e.target.value })),
            value: addNewAddress.street,
            placeholder: "House number and street name"
        },
        postcode: {
            title: 'Postcode / ZIP *',
            type: 'number',
            error: Errors?.postcode,
            onChange: (e) => dispatch(setAddress({ type: ADDRESS_TYPE.POSTCODE, payload: e.target.value })),
            value: addNewAddress.postcode
        },
        mobileNumber: {
            title: ' Mobile Number',
            type: 'number',
            error: Errors?.mobileNumber,
            onChange: (e) => dispatch(setAddress({ type: ADDRESS_TYPE.MOBILENUMBER, payload: e.target.value })),
            value: addNewAddress.mobileNumber
        }
    }), [addNewAddress, Errors, dispatch])

    return { addressformData, validateAddressForm, Errors, isLoading, addNewAddress, editAddressHandler, uploadAddressHandler }
}