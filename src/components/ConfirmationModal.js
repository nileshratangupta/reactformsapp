import React from 'react';
import '../App.css';


const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Confirmation</h2>
                <p>Are you sure you want to delete this item?</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "35px" }}>
                    <button className='save-btn' onClick={onConfirm}>Yes</button>
                    <button className='cancel-btn' onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;