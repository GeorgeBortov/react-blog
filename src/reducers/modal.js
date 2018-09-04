const initialState = {
    modalIsOpen: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                modalIsOpen: action.modalIsOpen
            };
        case 'CLOSE_MODAL':
            return {
                modalIsOpen: action.modalIsOpen,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
};