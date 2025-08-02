
export const bodyOverflowHandler = (isActive: boolean) => {
    if (isActive) {
        document.body.classList.add('overflow-hidden')
        document.body.style.touchAction = 'none'
    } else {
        document.body.classList.remove('overflow-hidden')
        document.body.style.touchAction = ''
    }
}
