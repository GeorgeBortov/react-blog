// Posts Reducer

const postsReducerDefaultState = {
    postsArr: [],
    postTotalNumb: 0,
};

export default (state = postsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                postsArr: [
                    ...state.postsArr,
                    action.post
                ]
            };
        case 'REMOVE_POST':
            return {
                ...state,
                postsArr: state.postsArr.filter(({ id }) => id !== action.id)
            };
        case 'EDIT_POST':
            return {
                ...state,
                postsArr: state.postsArr.map((post) => {
                    if (post.id === action.id) {
                        return {
                            ...post,
                            ...action.updates
                        }
                    } else {
                        return post;
                    }
                })
            };
        case 'SET_POSTS':
            return {
                postsArr: action.posts,
                postTotalNumb: action.postsNumb
            };
        default:
            return state;
    }
};
