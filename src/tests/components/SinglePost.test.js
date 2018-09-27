import React from 'react';
import { shallow } from 'enzyme';
import { SinglePost } from '../../components/SinglePost';
import posts from '../fixtures/posts';

test('should render error if post doesn\'t exist', () => {
    const  wrapper = shallow(<SinglePost />);
    expect(wrapper).toMatchSnapshot();
});

test('should render SinglePost correctly', () => {
    const wrapper = shallow(<SinglePost
        post={posts[0]}
    />);
    expect(wrapper).toMatchSnapshot();
});