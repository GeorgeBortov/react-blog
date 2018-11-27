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
export const setPosts = (posts, postsNumb) => ({
    type: 'SET_POSTS',
    posts,
    postsNumb
});

export const startSetPosts = (startAt, endAt) => {
    return (dispatch, getState) => {
        const sortBy = getState().filters.sortBy;
        const title = getState().filters.title;
        const authorID = getState().filters.authorID;
        // Add order to posts
        const ref = database.ref();
        
        
        if(authorID !== "") {
            var query = ref.child('posts').orderByChild('authorID').equalTo(authorID).once('value');
        } else {
            var query = ref.child('posts').once('value');
        }
        return query
        
        .then((snapshot) => {
            const unsortedPosts = [];
            const posts = [];
            
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().title.toLowerCase().includes(title.toLowerCase())) {
                    unsortedPosts.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    }); 
                }
            });
            
            if(sortBy ===  'dateASC') {
                var start = endAt;
                var end = startAt;
            } else if (sortBy ===  'dateDESC' || sortBy ===  'authorID') {
                var start = unsortedPosts.length - startAt;
                var end = unsortedPosts.length - endAt;
            }
            unsortedPosts.forEach(function(item, i) {
                
                if(i >= end && i < start) {
                    posts.push({
                        ...item
                    });
                }
            });
            
            dispatch(setPosts(posts, unsortedPosts.length));
        });
    }
};

// ADD_COMMENT
export const addComment = (comment) => ({
    type: 'ADD_COMMENT',
    comment
});

export const startAddComment = (commentData = {}, postId) => {
    return (dispatch) => {
        const {
            body = '',
            rate = '',
            authorName = '',
            createdAt = 0
        } = commentData;
        const comment = { body, rate, authorName, createdAt }
        
        return database.ref(`posts/${postId}/comments`).push(comment).then((ref) => {
            dispatch(addComment({
                id: ref.key,
                ...comment
            }));
        });
    }
};

// SET_COMMENTS
export const setComments = (comments) => ({
    type: 'SET_COMMENTS',
    comments
});

export const startSetComments = (pid) => {
    return (dispatch) => {
        
        return database.ref(`posts/${pid}/comments`)
        .once('value')
        .then((snapshot) => {
            const comments = [];

            snapshot.forEach((childSnapshot) => {
                comments.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            })
            dispatch(setComments(comments));
        });
    }
};