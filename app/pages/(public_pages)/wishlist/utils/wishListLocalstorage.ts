import { WishListItem } from "../types"

const setWishListToLocalStorage = (data: WishListItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('wish_list', JSON.stringify(data))
    }
}
const getWishListLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('wish_list')
        return data ? JSON.parse(data) : []
    }
}

export { getWishListLocalStorage, setWishListToLocalStorage }