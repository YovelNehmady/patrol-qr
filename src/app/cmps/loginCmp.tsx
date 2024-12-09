'use client';
import { ILoginData } from '@/models';
import React, { useEffect, useState, useRef } from 'react';
import { autoLoginService, getLocalStorage, login, setLocalStorage } from '../services';
import { useRouter } from 'next/navigation';

interface ILoginProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginCmp: React.FC<ILoginProps> = ({ setIsLoading }) => {
  const router = useRouter();
  const autoLoginCalled = useRef(false); // Ref to track if autoLogin was already called

  useEffect(() => {
    // Only run autoLogin if it hasn't been called before
    if (!autoLoginCalled.current) {
      setIsLoading(true);
      autoLogin();
      autoLoginCalled.current = true; // Mark as called
    }
  }); // Still use the empty dependency array to ensure this runs once

  const [formData, setFormData] = useState<ILoginData>({ username: '', password: '' });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = await login(formData);
      if (token) {
        setLocalStorage(token);
        router.replace('/dashboard'); // Example route after login
      }
    } catch (error) {
      console.log('Error during login:', error);
      // Handle login error (e.g., show popup)
    } finally {
      setFormData({ username: '', password: '' });
      setIsLoading(false);
    }
  };

  const autoLogin = async () => {
    try {
      const localStorage = getLocalStorage();
      if (localStorage) {
        const isLoggedIn: boolean = await autoLoginService(localStorage);
        if (isLoggedIn) {
          router.replace('/dashboard'); // Example route after successful auto-login
        }
      }
    } catch (error) {
      console.log('Error during auto-login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-cmp-container">
      <form onSubmit={handleSubmit}>
        <div className="email-container">
          <input
            size={18}
            autoFocus
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="שם משתמש"
          />
        </div>
        <div className="password-container">
          <input
            size={18}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="סיסמא"
          />
        </div>
        <button>התחבר</button>
      </form>
    </section>
  );
};

export default LoginCmp;