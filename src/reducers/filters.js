// Filters Reducer

const filtersReducerDefaultState = {
    title: '',
    sortBy: 'dateDESC',
    authorID: '',
    startAt: 0,
    endAt: 10,
    currentPage: 1

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
        case 'SET_START_AT_FILTER':
            return {
                ...state,
                startAt: action.startAt
            };
        case 'SET_END_AT_FILTER':
            return {
                ...state,
                endAt: action.endAt
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            };
        default:
            return state;
    }
};