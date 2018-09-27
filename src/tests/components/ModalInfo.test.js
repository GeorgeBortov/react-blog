import React from 'react';
import { shallow } from 'enzyme';
import ModalInfo from '../../components/ModalInfo';

let onRequestClose;

beforeEach(() => {
    onRequestClose = jest.fn();
    
});

test('should render close ModalInfo correctly', () => {
    const wrapper = shallow(<ModalInfo
        isOpen={false}
        onRequestClose={onRequestClose}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render open ConfirmModal correctly', () => {
    const wrapper = shallow(<ModalInfo
        isOpen={true}
        onRequestClose={onRequestClose}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle onRequestClose with button "Ok" ', () => {
    const wrapper = shallow(<ModalInfo
        onRequestClose={onRequestClose}
    />);
    wrapper.find('.removeExpense').simulate('click');
    expect(onRequestClose).toHaveBeenCalled();
});

test('should handle onRequestClose with button "X" ', () => {
    const wrapper = shallow(<ModalInfo
        onRequestClose={onRequestClose}
    />);
    wrapper.find('.modal__close').simulate('click');
    expect(onRequestClose).toHaveBeenCalled();
});