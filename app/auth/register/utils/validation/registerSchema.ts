import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
    name: Yup.string().trim()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(15, "Name cannot exceed 15 characters"),
    email: Yup.string().trim()
        .required("Email is required")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"),
    password: Yup.string().trim()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(10, "Password cannot exceed 10 characters"),
})