export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                name: action.name,
                uid: action.uid,
                email: action.email
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}