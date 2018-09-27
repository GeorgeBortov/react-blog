import modalReducer from '../../reducers/modal';

test('should set default state', () => {
    const state = modalReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        modalIsOpen: false
    });
});

test('should open modal', () => {
    const currentState = {
        modalIsOpen: false
    };
    const action = {
        type: 'OPEN_MODAL',
        modalIsOpen: true
    };
    const state = modalReducer(currentState, action);
    expect(state.modalIsOpen).toBeTruthy()
});

test('should close modal', () => {
    const currentState = {
        modalIsOpen: false
    };
    const action = {
        type: 'OPEN_MODAL',
        modalIsOpen: true
    };
    const state = modalReducer(currentState, action);
    expect(state.modalIsOpen).toBeTruthy()
});