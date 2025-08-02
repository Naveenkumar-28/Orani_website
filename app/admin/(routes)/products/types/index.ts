
export type FormErrors = {
    name: string;
    description: string;
    price: string;
    discountPrice: string;
    category: string;
    stock: string;
};

export type useAddProductHandlerPropsType = {
    closeHandler: () => void;
    fetchProducts: (page?: number, isFiltering?: boolean) => void;
}

export type UploadFormData = {
    file: File
    category: string,
    description: string,
    discountPrice: number | undefined,
    name: string,
    price: number,
    stock: number,
}

export type ProductCardType = {
    imageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: number,
    quantity: number,
    sold: number,
    stock: number,
    _id: string
}