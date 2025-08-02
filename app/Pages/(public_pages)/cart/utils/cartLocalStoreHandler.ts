import { cartItems } from "../types"


const getCartLocalStoreList = () => {
    if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('cart_list')
        return raw ? JSON.parse(raw) : []
    }
}


const setCartListToLocalStorage = (data: cartItems[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart_list', JSON.stringify(data))
    }
}


export { setCartListToLocalStorage, getCartLocalStoreList }