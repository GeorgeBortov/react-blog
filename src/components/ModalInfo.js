import React from 'react';
import Modal from 'react-modal';

const ModalInfo = ({isOpen, onRequestClose}) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Confirmation Modal"
        closeTimeoutMS={200}
        appElement={document.getElementById('app')}
        className={'modal'}
    >
        <div className="modal__body">
            <button onClick={onRequestClose} className="modal__close"></button>
            <h3 className="modal__title">Please check Your email. We send you a letter.</h3>
            <button onClick={onRequestClose} className="button removeExpense">Ok</button>
        </div>    
    </Modal>
);

export default ModalInfo;