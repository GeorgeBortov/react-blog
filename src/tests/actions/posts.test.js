import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddPost,
    addPost,
    startRemovePost,
    removePost,
    startEditPost,
    editPost,
    setPosts,
    startSetPosts
} from '../../actions/posts';
import posts from '../fixtures/posts';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const postsData = {};
    posts.forEach(({id, title, body, createdAt, authorName}) => {
        postsData[id] = { title, body, createdAt, authorName, authorID: uid }
    });
    database.ref(`posts/`).set(postsData).then(() => done());
});

test('should set up remove post action object', () => {
    const action = removePost({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_POST',
        id: '123abc'
    });
});

test('should remove post from database', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = posts[0].id;

    store.dispatch(startRemovePost({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_POST',
            id
        });

        return database.ref(`posts/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should set up add post action object', () => {
    const action = editPost('123abc', { body: 'New body value' });
    expect(action).toEqual({
        type: 'EDIT_POST',
        id: '123abc',
        updates: {
            body: 'New body value'
        }
    });
});

test('should edit posts from database', (done) => {
    const store = createMockStore(defaultAuthState);

    const id = posts[0].id;
    const updates = {
        body: 'New body value'
    }

    store.dispatch(startEditPost(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_POST',
            id,
            updates
        });
        return database.ref(`posts/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().body).toBe(updates.body);
        done();
    });
});

test('should setup add post action object with provided values', () => {
    const action = addPost(posts[2]);
    expect(action).toEqual({
        type: 'ADD_POST',
        post: posts[2]
    });
});

test('should add post to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const postData = {
        authorID: uid,
        authorName: 'John Doe',
        body: 'Lorem ipsum',
        createdAt: 1000,
        title: 'Lorem'
    };

    store.dispatch(startAddPost(postData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_POST',
            post: {
                id: expect.any(String),
                ...postData
            }
        });

        return database.ref(`posts/${actions[0].post.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(postData);
        done();
    });
});

test('should add post with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const postDefaults = {
        authorID: uid,
        title: '',
        body: '',
        createdAt: 0,
        authorName: ''
    };

    store.dispatch(startAddPost({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_POST',
            post: {
                id: expect.any(String),
                ...postDefaults
            }
        });

        return database.ref(`posts/${actions[0].post.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(postDefaults);
        done();
    });
});

test('should setup set post action object with data', () => {
    const action = setPosts(posts);
    expect(action).toEqual({
        type: 'SET_POSTS',
        posts
    });
});

test('should fetch the posts from database', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetPosts()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_POSTS',
            posts
        });
        done();
    });
});