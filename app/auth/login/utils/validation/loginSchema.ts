import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string().trim()
        .required("Email is required")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"),
    password: Yup.string().trim()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(10, "Password cannot exceed 10 characters"),
})