import postsReducer from '../../reducers/posts';
import posts from '../fixtures/posts';

test('should set default state', () => {
    const state = postsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove post by id', () => {
    const action = {
        type: 'REMOVE_POST',
        id: posts[1].id
    };
    const state = postsReducer(posts, action);
    expect(state).toEqual([posts[0], posts[2]]);
});

test('should not remove posts if id not found', () => {
    const action = {
        type: 'REMOVE_POST',
        id: '-1'
    };
    const state = postsReducer(posts, action);
    expect(state).toEqual(posts);
});

test('should add an post', () => {
    const post = {
        id: '123',
        title: 'New post',
        body: '',
        createdAt: -20000,
        authorName: 'John Doe',
        authorID: 'somenewauthorid'
    };
    const action = {
        type: 'ADD_POST',
        post
    };
    const state = postsReducer(posts, action);
    expect(state).toEqual([...posts, post]);
});

test('should edit an post', () => {
    const body = 'New post body';
    const action = {
        type: 'EDIT_POST',
        id: posts[1].id,
        updates: {
            body
        }
    };
    const state = postsReducer(posts, action);
    expect(state[1].body).toBe(body);
});

test('should not edit post if post not found', () => {
    const body = 'New post body';
    const action = {
        type: 'EDIT_POST',
        id: '-1',
        updates: {
            body
        }
    };
    const state = postsReducer(posts, action);
    expect(state).toEqual(posts);
});

test('should set posts', () => {
    const action = {
        type: 'SET_POSTS',
        posts: [posts[1]]
    };
    const state = postsReducer(posts, action);
    expect(state).toEqual([posts[1]]);
});