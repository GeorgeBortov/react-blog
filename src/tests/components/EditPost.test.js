import React from 'react';
import { shallow } from 'enzyme';
import { EditPost } from '../../components/EditPost';
import posts from '../fixtures/posts';


let startEditPost, startRemovePost, history, openModal, closeModal, wrapper;

beforeEach(() => {
    startEditPost = jest.fn();
    startRemovePost = jest.fn();
    openModal = jest.fn();
    closeModal = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditPost
        startEditPost={startEditPost}
        startRemovePost={startRemovePost}
        closeModal={closeModal}
        openModal={openModal}
        history={history}
        post={posts[1]}
        uid="thisismytestuid"
    />);
});

test('should render EditPost correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render error if post doesn\'t exist', () => {
    const wrapper = shallow(<EditPost
        startEditPost={startEditPost}
        startRemovePost={startRemovePost}
        closeModal={closeModal}
        openModal={openModal}
        history={history}
        uid="thisismytestuid"
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error EditPost if uid is not macthed authorID', () => {
    const wrapper = shallow(<EditPost
        startEditPost={startEditPost}
        startRemovePost={startRemovePost}
        closeModal={closeModal}
        openModal={openModal}
        history={history}
        post={posts[1]}
        uid="otheruid"
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditPost', () => {
    wrapper.find('Connect(BlogForm)').prop('onSubmit')(posts[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditPost).toHaveBeenLastCalledWith(posts[1].id, posts[1]);
});

test('should handle startRemovePost', () => {
    wrapper.find('ConfirmModal').prop('onRemove')();
    expect(startRemovePost).toHaveBeenLastCalledWith({
        id: posts[1].id
    });
    expect(closeModal).toHaveBeenCalled();
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle openModal', () => {
    wrapper.find('.button.button--secondary').simulate('click');
    expect(openModal).toHaveBeenCalled();
});
test('should handle closeModal', () => {
    wrapper.find('ConfirmModal').prop('onRequestClose')();
    expect(closeModal).toHaveBeenCalled();
});