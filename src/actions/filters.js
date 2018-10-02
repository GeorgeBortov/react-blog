// SET_TEXT_FILTER
export const setTitleFilter = (title = '') => ({
    type: 'SET_TITLE_FILTER',
    title
});

// SET_DATE_ASC_FILTER
export const setDateAscFilter = () => ({
    type: 'SET_DATE_ASC_FILTER'
});

// SET_DATE_DESC_FILTER
export const setDateDescFilter = () => ({
    type: 'SET_DATE_DESC_FILTER'
});

// SET_AUTHOR_ID_FILTER
export const setAuthorIDFilter = (authorID) => ({
    type: 'SET_AUTHOR_ID_FILTER',
    authorID
});

// SET_RESET_FILTER
export const setResetFilter = () => ({
    type: 'SET_RESET_FILTER'
});
