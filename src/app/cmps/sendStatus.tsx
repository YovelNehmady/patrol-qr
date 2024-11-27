'use client';
import React, { useState } from 'react';
interface IPatrolData {
  names: string;
  isStatusOk: boolean;
  description?: string;
};
//todo:  add a saveing function.

const SendStatus = ({ }) => {
  const [formData, setFormData] = useState<IPatrolData>({ names: '', isStatusOk: false });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      console.log(name, value, type, checked);

      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };
  return (
    <section className='send-status'>
      <form onSubmit={handleSubmit} id='statusForm'>

        <div className='names-container'>
          <label htmlFor="names" >
            *מבצעי הפטרול
          </label>
          <input
            size={18}
            autoFocus={true}
            type="text"
            id="names"
            name="names"
            value={formData.names}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className='description-container'>
          <label htmlFor="description" >
            הערות נוספות
            <p>
              (רשות)
              עד 50 תווים
            </p>
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
          ></textarea>
        </div>

        <div className='is-status-ok-and-btn-container'>
          <div>
            <label htmlFor="isStatusOk" >
              סטטוס תקין
            </label>
            <input
              type="checkbox"
              id="isStatusOk"
              name="isStatusOk"
              onChange={handleChange}
              value={'off'}
            />
          </div>
          <button type='submit'>send</button>
        </div>

      </form>
    </section>
  );
};

export default SendStatus;