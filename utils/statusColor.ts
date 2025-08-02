export const statusColor = (color: String) => {
    return color == 'pending' ? "bg-amber-400" : color == "confirmed" ? "bg-green-500" : color == "shipping" ? 'bg-green' : color == "delivered" ? "bg-black" : color == "cancelled" ? "bg-red-500" : ''
}