// Filters Reducer

const filtersReducerDefaultState = {
    title: '',
    sortBy: 'dateASC',
    authorID: ''
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TITLE_FILTER':
            return {
                ...state,
                title: action.title
            };
        case 'SET_DATE_ASC_FILTER':
            return {
                ...state,
                sortBy: 'dateASC',
                authorID: ''
            };
        case 'SET_DATE_DESC_FILTER':
            return {
                ...state,
                sortBy: 'dateDESC',
                authorID: ''
            };
        case 'SET_AUTHOR_ID_FILTER':
            return {
                ...state,
                sortBy: 'authorID',
                authorID : action.authorID
            };
        case 'SET_RESET_FILTER':
            return {
                ...filtersReducerDefaultState
            };
        default:
            return state;
    }
};