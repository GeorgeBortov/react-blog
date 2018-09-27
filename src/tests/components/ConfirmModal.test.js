import React from 'react';
import { shallow } from 'enzyme';
import ConfirmModal from '../../components/ConfirmModal';
import posts from '../fixtures/posts';

let onRequestClose, onRemove;

beforeEach(() => {
    onRequestClose = jest.fn();
    onRemove = jest.fn();
});

test('should render close ConfirmModal correctly', () => {
    const wrapper = shallow(<ConfirmModal
        postTitle={posts[0].title}
        isOpen={false}
        onRemove={onRemove}
        onRequestClose={onRequestClose}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render open ConfirmModal correctly', () => {
    const wrapper = shallow(<ConfirmModal
        postTitle={posts[0].title}
        isOpen={true}
        onRemove={onRemove}
        onRequestClose={onRequestClose}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle onRemove', () => {
    const wrapper = shallow(<ConfirmModal
        onRemove={onRemove}
    />);
    wrapper.find('.removeExpense').simulate('click');
    expect(onRemove).toHaveBeenCalled();
});

test('should handle onRequestClose with button "NO" ', () => {
    const wrapper = shallow(<ConfirmModal
        onRequestClose={onRequestClose}
    />);
    wrapper.find('.button--secondary').simulate('click');
    expect(onRequestClose).toHaveBeenCalled();
});

test('should handle onRequestClose with button "X" ', () => {
    const wrapper = shallow(<ConfirmModal
        onRequestClose={onRequestClose}
    />);
    wrapper.find('.modal__close').simulate('click');
    expect(onRequestClose).toHaveBeenCalled();
});