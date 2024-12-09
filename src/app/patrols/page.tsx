'use client';
import { IPatrolDataFromDB } from '@/models';
import React, { useEffect, useRef, useState } from 'react';
import LoaderSvg from '../cmps/loading';
import { getAllPatrols } from '../services';

const PatrolList = () => {
    const [patrols, setPatrols] = useState<IPatrolDataFromDB[]>([]);
    const getPatrolsCalled = useRef(false);

    useEffect(() => {
        if (!getPatrolsCalled.current) {
            getPatrols();
            getPatrolsCalled.current = true;
        }
        console.log(patrols)
    });

    const getPatrols = async () => {
        try {
            const patrols = await getAllPatrols();
            setPatrols(patrols);
        } catch (error) {
            console.error('error with get patrols ', error);
        }
    };

    return (<>
        {patrols.length ? <div className="patrol-list">
            {patrols.map((patrol) => (
                <div key={patrol._id} className="patrol-card">
                    <div className="patrol-header">
                        <span className={`status ${patrol.isStatusOk === true ? 'ok' : 'not-ok'}`}>
                            {patrol.isStatusOk === true ? '✔ פטרול תקין' : '✘ פטרול לא תקין'}
                        </span>
                        <span className="timestamp">{patrol.createdAt as string}</span>
                    </div>
                    <div className="patrol-members">מבצעי הפטרול {patrol.names}</div>
                    {patrol.description && <div className="patrol-description">תיאור נוסף: {patrol.description}</div>}
                </div>
            ))}
        </div>
            :
            <div>
                <p style={{ height: 'fit-content' }}>מייבא מידע</p>
                <LoaderSvg />
            </div>
        }
    </>
    );
};

export default PatrolList;