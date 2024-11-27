import React from 'react';

function WarningModal({ setIsWarningModal }: any) {
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

                        }}
                        className='ok-btn'>המשך</button>
                </div>
            </div>
        </div>
    );
}

export default WarningModal;
