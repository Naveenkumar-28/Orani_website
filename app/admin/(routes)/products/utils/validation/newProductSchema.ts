import * as Yup from "yup";

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 2MB

export const newProductSchema = Yup.object({
    file: Yup
        .mixed()
        .required('Image is required')
        .test('fileType', 'Unsupported file format', (value) => {
            if (value instanceof File) {
                return value && SUPPORTED_FORMATS.includes(value?.type);
            }
            return false
        })
        .test('fileSize', 'File is too large', (value) => {
            if (value instanceof File) {
                return value.size <= MAX_FILE_SIZE;
            }
            return false;
        }),

    name: Yup.string().trim().lowercase()
        .required("Name is required!")
        .min(3, "Name must be at least 3 characters")
        .max(15, "Name cannot exceed 15 characters"),

    description: Yup.string().trim().lowercase()
        .required("Description is required!")
        .min(10, "Description must be at least 10 characters")
        .max(250, "Description cannot exceed 250 characters"),

    price: Yup.number()
        .transform((value, originalValue) => originalValue == '' ? undefined : value)
        .required("Price is required!")
        .max(1000, "Price should be 1000 or below"),
    discountPrice: Yup.number()
        .transform((value, originalValue) => originalValue == '' || originalValue == null ? 0 : value)
        .test((...rest) => {
            const { createError, parent } = rest[1]
            const { price, discountPrice } = parent
            return discountPrice < price ? true : createError({ message: 'Discount Price should be less than to Price' })
        }),

    category: Yup.string().trim()
        .required("Please choose category"),

    stock: Yup.number()
        .transform((value, originalValue) => originalValue == '' ? undefined : value)
        .required("Stock is required!")
        .max(1000, "Stock should be 1000 or below"),
})