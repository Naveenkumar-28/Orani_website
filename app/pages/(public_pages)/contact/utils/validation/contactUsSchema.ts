import * as Yup from 'yup'

export const contactUsSchema = Yup.object().shape({
    name: Yup.string().trim().lowercase()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(15, "Name cannot exceed 15 characters"),
    email: Yup.string().trim()
        .required("Email is required")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address"),
    subject: Yup.string().trim().lowercase()
        .required("Subject is required")
        .min(10, "Subject must be at least 10 characters")
        .max(50, "Subject cannot exceed 50 characters"),
    message: Yup.string().trim().lowercase()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(120, "Message cannot exceed 120 characters"),
})