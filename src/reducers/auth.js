export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                name: action.name,
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}