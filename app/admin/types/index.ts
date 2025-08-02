export interface OrderItemType {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

type shippingAddress = {
    city: string,
    country: string,
    firstName: string,
    lastName: string
    mobileNumber: number,
    postcode: number
    street: string
}


export interface OrderType {
    _id: string;
    razorpay_order_id: string;
    items: OrderItemType[];
    paymentStatus: boolean;
    orderStatus: string;
    subtotal: number;
    discount: number;
    deliveryCharge: number;
    totalAmount: number;
    shippingAddress: shippingAddress;
    paymentMethod: string;
    createdAt: Date;
}

export type ProductType = {
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