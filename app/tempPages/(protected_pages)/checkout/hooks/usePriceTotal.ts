import { RootState } from "@/app/redux/store"
import { memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const usePricetotal = () => {
    const { cartList } = useSelector((state: RootState) => state.CartItems) || []

    const [pricing, setPricing] = useState({
        subtotal: 0,
        discount: 0,
        deliveryCharge: 0,
        total: 0
    });


    useEffect(() => {

        setPricing((pre) => {
            const subtotal = cartList.reduce((acc, value) => {
                return acc + ((value.quantity) * (value.discountPrice ? value.discountPrice : value.price))
            }, 0)
            const discount = 0
            const deliveryCharges = subtotal > 500 ? 0 : 50
            const total = (subtotal + deliveryCharges) - discount
            return {
                subtotal: subtotal,
                discount: discount,
                deliveryCharge: deliveryCharges,
                total: total
            }
        })
    }, [cartList])

    return { pricing }
}
