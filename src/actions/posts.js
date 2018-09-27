import database from '../firebase/firebase';

// ADD_POST
export const addPost = (post) => ({
    type: 'ADD_POST',
    post
});

export const startAddPost = (postData = {}) => {
    return (dispatch, getState) => {
        const authorID = getState().auth.uid;
        const {
            title = '',
            body = '',
            createdAt = 0,
            authorName = '',
        } = postData;
        const post = { title, body, createdAt, authorName, authorID }
        
        return database.ref(`posts`).push(post).then((ref) => {
            dispatch(addPost({
                id: ref.key,
                ...post
            }));
        });
    }
};

// REMOVE_EXPENSE
export const removePost = ({ id } = {}) => ({
    type: 'REMOVE_POST',
    id
});

export const startRemovePost = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`posts/${id}`).remove().then(() => {
            dispatch(removePost({ id }));
        });
    }
};

// EDIT_EXPENSE
export const editPost = (id, updates) => ({
    type: 'EDIT_POST',
    id,
    updates
});

export const startEditPost = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`posts/${id}`).update(updates).then(() => {
            dispatch(editPost(id, updates));
        });
    }
};

// SET_POSTS
export const setPosts = (posts) => ({
    type: 'SET_POSTS',
    posts
});

export const startSetPosts = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        // return database.ref(`users/${uid}/posts`)
        return database.ref(`posts`)
        .once('value')
        .then((snapshot) => {
            const posts = [];

            snapshot.forEach((childSnapshot) => {
                posts.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            })
            dispatch(setPosts(posts));
        });
    }
};