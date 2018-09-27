import React from 'react';
import { shallow } from 'enzyme';
import posts from '../fixtures/posts';
import { BlogListItem } from '../../components/BlogListItem';
import trimText from '../../selectors/trim-text';

test('should render BlogListItem with post and disabled editable link because uid is undefined', () => {
    const wrapper = shallow(<BlogListItem 
        {...posts[0]}
        trimText={trimText(posts[0].body, 255)}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should add editable link to post', () => {
    const uid = 'thisismytestuid';
    const wrapper = shallow(<BlogListItem 
        {...posts[0]}
        uid={uid}
    />);
    expect(wrapper).toMatchSnapshot();
});
