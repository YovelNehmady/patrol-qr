'use client';
import { ILoginForm } from '@/models';
import React, { useState } from 'react';


function LoginCmp() {
  const [formData, setFormData] = useState<ILoginForm>({ email: '', password: '' });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      console.log("Form Data:", formData);

    } catch (error) {

    }
  };
  return (
    <section className='login-cmp-container'>

      <form onSubmit={handleSubmit}  >
        <div className='email-container'>
          <label htmlFor="email" >
            אימייל          </label>
          <input
            size={18}
            autoFocus={true}
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
          // placeholder='אימייל'
          />
        </div>
        <div className='password-container'>
          <label htmlFor="password" >
            סיסמא        </label>
          <input
            size={18}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          // placeholder='סיסמא'
          />
        </div>
        <button>התחבר</button>
      </form>

    </section >
  );
}

export default LoginCmp;