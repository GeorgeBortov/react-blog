export const openModal = () => {
    return {
        type: 'OPEN_MODAL',
        modalIsOpen: true
    }
}
export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL',
        modalIsOpen: false,
    }
}