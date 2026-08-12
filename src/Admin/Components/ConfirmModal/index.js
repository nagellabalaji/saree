import "./ConfirmModal.css";

const ConfirmModal = ({
    isOpen,
    title,
    message,
    onCancel,
    onConfirm
}) => {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="confirm-modal">

                <div className="warning-icon">

                    ⚠️

                </div>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >

                        Cancel

                    </button>

                    <button
                        className="confirm-btn"
                        onClick={onConfirm}
                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ConfirmModal;