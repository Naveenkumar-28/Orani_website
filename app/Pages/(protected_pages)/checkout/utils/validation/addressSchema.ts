import * as Yup from 'yup'

export const addressSchema = Yup.object().shape({
    firstName: Yup.string().trim().lowercase()
        .required("Firstname is required")
        .min(3, "Firstname must be at least 3 characters")
        .max(10, "Firstname cannot exceed 10 characters"),
    lastName: Yup.string().trim().lowercase()
        .required("lastname is required")
        .min(3, "lastname must be at least 3 characters")
        .max(10, "lastname cannot exceed 10 characters"),
    street: Yup.string().trim().lowercase()
        .required("Street address is required")
        .min(10, "Street address must be at least 10 characters")
        .max(50, "Street address cannot exceed 50 characters"),
    city: Yup.string().trim().lowercase()
        .required("City is required")
        .min(3, "City must be at least 3 characters")
        .max(20, "City cannot exceed 20 characters"),
    country: Yup.string().trim().lowercase()
        .required("Country is required")
        .min(3, "Country must be at least 3 characters")
        .max(20, "Country cannot exceed 20 characters"),
    postcode: Yup.string().trim()
        .required("Postcode is required")
        .min(3, "Postcode must be at least 3 digits")
        .max(10, "Postcode cannot exceed 10 digits"),
    mobileNumber: Yup.string().trim()
        .required("Mobile number is required")
        .min(10, "Mobile number must be exactly 10 digits")
        .max(10, "Mobile number must be exactly 10 digits"),
})