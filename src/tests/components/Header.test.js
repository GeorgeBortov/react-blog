import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should show button login if user is no auth', () => {
    const wrapper = shallow(<Header startLogout={() => {}} isAuthenticated={false} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#login').prop('to')).toBe('/login');
});
test('should show button logout if user is auth', () => {
    const wrapper = shallow(<Header startLogout={() => {}} isAuthenticated={true} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#logout').length).toBeGreaterThan(0);
});

test('should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} isAuthenticated={true}/>);
    wrapper.find('#logout').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});