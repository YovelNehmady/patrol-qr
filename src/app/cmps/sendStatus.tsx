'use client';
import React, { useState } from 'react';
import WarningModal from './warningModal';
import { IFormData } from '@/models';
import { sendForm } from '../services';
import { useRouter } from 'next/navigation';
import Loading from './loading';

const SendStatus = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<IFormData>({ names: '', isStatusOk: false, description: '' });
  const [isWarningModal, setIsWarningModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox') {
      // Type narrows to HTMLInputElement when type is 'checkbox'
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.isStatusOk) {
      setIsWarningModal(true);
    } else {
      savePatrol();
    }
  };

  const savePatrol = async () => {
    try {
      setIsLoading(true);
      await sendForm(formData);
      router.replace('after-status');
    } catch (error) {
      console.log(error);
      router.replace('scan-again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className='send-status'>
        <form onSubmit={handleSubmit} id='statusForm'>
          <div className='names-container'>
            <label htmlFor="names">
              *מבצעי הפטרול
            </label>
            <input
              size={18}
              autoFocus
              type="text"
              id="names"
              name="names"
              value={formData.names}
              onChange={handleChange}
              required
            />
          </div>

          <div className='description-container'>
            <label htmlFor="description">
              הערות נוספות
              <p>(רשות) עד 50 תווים</p>
            </label>
            <textarea
              maxLength={50}
              wrap='soft'
              rows={4}
              cols={20}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              form='statusForm'
            />
          </div>

          <div className='is-status-ok-and-btn-container'>
            <div>
              <label htmlFor="isStatusOk">
                סטטוס תקין
              </label>
              <input
                type="checkbox"
                id="isStatusOk"
                name="isStatusOk"
                onChange={handleChange}
                checked={formData.isStatusOk}
              />
            </div>
            <button type='submit'>שלח</button>
          </div>
        </form>

        {isWarningModal && <WarningModal setIsWarningModal={setIsWarningModal} savePatrol={savePatrol} />}
      </section>
      {isLoading && <Loading />}
    </>
  );
};

export default SendStatus;
