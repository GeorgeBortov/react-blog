import { openModal, closeModal } from '../../actions/modal';

test('should generate open modal action object', () => {
    const action = openModal();
    expect(action).toEqual({
        type: 'OPEN_MODAL',
        modalIsOpen: true
    });
});

test('should generate close modal action object', () => {
    const action = closeModal();
    expect(action).toEqual({
        type: 'CLOSE_MODAL',
        modalIsOpen: false
    });
});