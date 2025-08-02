export const getFormatDate = (date: string): string | null => {
    const findDigit = (num: number) => {
        return num < 10 ? `0${num}` : num
    }
    const formattedDate = new Date(date)
    return date ? `${formattedDate.getFullYear()}-${findDigit(formattedDate.getMonth() + 1)}-${findDigit(formattedDate.getDate())}` : null
}