export default (state = {}, action) => {
    switch (action.type) {
        case 'LOADER':
            return {
                load: action.load, 
            };
        default:
            return state;
    }
}