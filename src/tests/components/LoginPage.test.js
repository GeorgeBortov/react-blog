import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
    const startGoogleLogin = jest.fn();
    const wrapper = shallow(<LoginPage startGoogleLogin={startGoogleLogin}/>);
    wrapper.find('.button--google-login').simulate('click', {
        preventDefault: () => { }
    });
    expect(startGoogleLogin).toHaveBeenCalled();
});

test('should call startEmailLogin on button click', () => {
    const startEmailLogin = jest.fn(() => Promise.reject(new Error()));
   
    const wrapper = shallow(<LoginPage startEmailLogin={startEmailLogin} />);
    wrapper.find('.button--login-email').simulate('click', {
        preventDefault: () => { }
    });

    expect(startEmailLogin).toHaveBeenCalled();

});

test('should call regWithEmail on button click', () => {
    const startRegisterUser = jest.fn(() => Promise.reject(new Error()));
   
    const wrapper = shallow(<LoginPage startRegisterUser={startRegisterUser} />);
    wrapper.find('.button--reg-email').simulate('click', {
        preventDefault: () => { }
    });

    expect(startRegisterUser).toHaveBeenCalled();

});

test('should call resetPass on button click', () => {
    const sendResetLink = jest.fn(() => Promise.reject(new Error()));
   
    const wrapper = shallow(<LoginPage sendResetLink={sendResetLink} />);
    wrapper.find('.button--resetPass').simulate('click', {
        preventDefault: () => { }
    });

    expect(sendResetLink).toHaveBeenCalled();

});
