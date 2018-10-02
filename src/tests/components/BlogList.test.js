import React from 'react';
import { shallow } from 'enzyme';
import { BlogList } from '../../components/BlogList';
import posts from '../fixtures/posts';

test('should render BlogList with posts', () => {
    const wrapper = shallow(<BlogList posts={posts}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render BlogList with empty message', () => {
    const wrapper = shallow(<BlogList posts={[]}/>);
    expect(wrapper).toMatchSnapshot();
});