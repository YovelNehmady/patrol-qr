'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { changeQrCode, getQrCode } from '../services';
import LoaderSvg from '../cmps/loading';

function Qr() {
    const QR_BASE_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://www.google.com?code=';
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        (async () => {
            const code = await getQrCode();
            setImgSrc(`${QR_BASE_URL}${code}`);
        })();
    }, []);

    const generateNewQrCode = async () => {
        setImgSrc('');
        const newCode = await changeQrCode();
        console.log('newCode',newCode);
        
        setImgSrc(`${QR_BASE_URL}${newCode}`);
    };

    return (<>
        <h2 className='printable only-print'>כח אריאל ביחד ננצח</h2>
        <p className='printable only-print'>נא לסרוק את הקוד בתום ביצוע הפטרול בכדי לשלוח את סטטוס הפטרול</p>
        {imgSrc ?
            <div className='printable qr-page'>
                <div className='printable img-container '>
                    <Image className='printable'
                        src={imgSrc}
                        alt="QR Code"
                        width={200}
                        height={200}
                    />
                </div>
                <div className='qr-action-btn-container'>
                    <button className='print-btn' onClick={window.print}> הדפס קוד QR</button>
                    <button className='new-qr-btn' onClick={generateNewQrCode}>QR חדש</button>
                </div>

            </div>
            :
            <LoaderSvg />}

    </>
    );
}

export default Qr;