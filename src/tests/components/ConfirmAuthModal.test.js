import React from 'react';
import { shallow } from 'enzyme';
import ConfirmAuthModal from '../../components/ConfirmAuthModal';

let onRequestClose, addNewAccount;

beforeEach(() => {
    onRequestClose = jest.fn();
    addNewAccount = jest.fn();
});

test('should render close ConfirmAuthModal correctly', () => {
    const wrapper = shallow(<ConfirmAuthModal
        isOpen={false}
        addNewAccount={addNewAccount}
        onRequestClose={onRequestClose}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render open ConfirmAuthModal correctly', () => {
    const wrapper = shallow(<ConfirmAuthModal
        isOpen={true}
        addNewAccount={addNewAccount}
        onRequestClose={onRequestClose}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle addNewAccount', () => {
    const wrapper = shallow(<ConfirmAuthModal
        isOpen={false}
        addNewAccount={addNewAccount}
        onRequestClose={onRequestClose}
    />);
    wrapper.find('.removeExpense').simulate('click');
    expect(addNewAccount).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
});

test('should handle onRequestClose with button "NO" ', () => {
    const wrapper = shallow(<ConfirmAuthModal
        providerName={'google.com'}
        isOpen={false}
        addNewAccount={addNewAccount}
        onRequestClose={onRequestClose}
    />);
    wrapper.find('.button--secondary').simulate('click');
    expect(onRequestClose).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
});

test('should handle onRequestClose with button "X" ', () => {
    const wrapper = shallow(<ConfirmAuthModal
        providerName={'google.com'}
        isOpen={false}
        addNewAccount={addNewAccount}
        onRequestClose={onRequestClose}
    />);
    wrapper.find('.modal__close').simulate('click');
    expect(onRequestClose).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
});