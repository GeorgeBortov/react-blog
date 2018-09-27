import React from 'react';
import { shallow } from 'enzyme';
import { BlogForm } from '../../components/BlogForm';
import posts from '../fixtures/posts';

test('should render BlogForm correctly if author is undefined', () => {
    const wrapper = shallow(<BlogForm 
        userName=""
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render BlogForm correctly if author is defined', () => {
    const wrapper = shallow(<BlogForm
        userName={posts[1].authorName}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render BlogForm correctly with post if author is undefined', () => {
    const wrapper = shallow(<BlogForm
        userName=""
        post={posts[0]}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render BlogForm correctly with post if author is defined', () => {
    const wrapper = shallow(<BlogForm
        userName={posts[1].authorName}
        post={posts[1]}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<BlogForm
        userName=""
    />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set title on input change', () => {
    const value = 'New post title';
    const wrapper = shallow(<BlogForm
        userName=""
    />);
    wrapper.find('input.form--title').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('title')).toBe(value);
});

test('should set body on text editor change', () => {
    const value = 'New post body';
    const wrapper = shallow(<BlogForm
        userName=""
    />);
    wrapper.find('JoditEditor').prop('onChange')(value);
    expect(wrapper.state('body')).toBe(value);
});

test('should set author name if author name is undefined', () => {
    const wrapper = shallow(<BlogForm
        userName=""
    />);
    const value = "George Bortov";
    wrapper.find('input.form--author').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('authorName')).toBe(value);
});