import React from 'react';
import { shallow } from 'enzyme';
import { AddPost } from '../../components/AddPost';
import posts from '../fixtures/posts';

let startAddPost, history, wrapper;

beforeEach(() => {
    startAddPost = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddPost
        startAddPost={startAddPost}
        history={history}
    />);
});

test('should render AddPost correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('Connect(BlogForm)').prop('onSubmit')(posts[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddPost).toHaveBeenLastCalledWith(posts[1]);
});