export type OrderType = {
    createdAt: string,
    orderStatus: string,
    paymentMethod: string,
    paymentStatus: boolean,
    razorpay_order_id: string,
    totalPrice: number,
    user: string,
    __v?: number,
    _id: string,

    products: [{
        image: string,
        _id: string,
        name: string,
        price: string,
        quantity: number,
        sold: number,
        stock: number
    }],
    shippingAddress: {
        city: string,
        country: string,
        firstName: string,
        lastName: string
        mobileNumber: number,
        postcode: number
        street: string
    }
}
export type OrdersType = {
    createdAt: string,
    orderStatus: string,
    paymentMethod: string,
    paymentStatus: boolean,
    razorpay_order_id: string,
    totalPrice: number,
    user: string,
    __v?: number,
    _id: string
}