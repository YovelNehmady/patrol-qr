import React from 'react';
interface IWarningProps {
    setIsWarningModal: React.Dispatch<React.SetStateAction<boolean>>;
    savePatrol: () => Promise<void>;
}
const WarningModal: React.FC<IWarningProps> = ({ setIsWarningModal, savePatrol }) => {
    return (
        <div className='warning-modal-container'>

            <div className='warning-modal'>
                <p>
                    שים לב כי לא סימנת שהפטרול תקין,
                    האם להמשיך ולשלוח שהפטרול לא תקין?
                </p>
                <div className='btn-container'>
                    <button
                        onClick={() => {
                            setIsWarningModal(false);
                        }}
                        className='back-btn'>חזור</button>

                    <button
                        onClick={() => {
                            savePatrol();
                        }}
                        className='ok-btn'>המשך</button>
                </div>
            </div>
        </div>
    );
};

export default WarningModal;
