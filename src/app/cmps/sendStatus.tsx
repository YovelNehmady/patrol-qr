'use client';
import React, { useState } from 'react';
interface IPatrolData {
  names: string;
  isStatusOk: boolean;
  description?: string;
};
//todo: add a section to description, add a saveing function, design.

const SendStatus = () => {
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
      <form onSubmit={handleSubmit}>

        <label htmlFor="isStatusOk" >
          סטטוס תקין
        </label>
        <input
          type="checkbox"
          id="isStatusOk"
          name="isStatusOk"
          // value={formData.isStatusOk}
          onChange={handleChange}
        />

        <label htmlFor="names" >
          מבצעי הפטרול
        </label>
        <input
          type="text"
          id="names"
          name="names"
          value={formData.names}
          onChange={handleChange}
        />
        <button type='submit'>send</button>
      </form>
    </section>
  );
};

export default SendStatus;
