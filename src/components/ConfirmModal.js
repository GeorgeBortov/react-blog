import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = ({isOpen, onRequestClose, onRemove, postTitle}) => (
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
            <h3 className="modal__title">Are you sure you want to delete a "{postTitle}" post?</h3>
            <button onClick={onRemove} className="button removeExpense">Yes</button>
            <button onClick={onRequestClose} className="button button--secondary">No</button>
        </div>
               
    </Modal>
);

export default ConfirmModal;