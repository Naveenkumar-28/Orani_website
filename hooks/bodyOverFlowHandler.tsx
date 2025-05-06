
const bodyOverflowHandler = (isActive: boolean) => {
    if (isActive) {
        document.body.classList.add('overflow-hidden')
    } else {
        document.body.classList.remove('overflow-hidden')
    }
}

export default bodyOverflowHandler