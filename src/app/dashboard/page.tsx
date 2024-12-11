'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { logout } from '../services';

function Dashboard() {
  const router = useRouter();

  const doLogout = async ()=>{
    try {
      await logout()
      router.replace('/login');
    } catch (error) {
      console.error('error with log out ',error)
    }finally{

    }
  }

  return (
    <div className='dashboard-page'>
      <section onClick={() => {
        router.push('/qr');
      }}>QR</section>
      <section onClick={()=>router.push('/patrols')}>היסטוריית פטרולים</section>
      <section  onClick={() => {
        router.push('/notifications');
      }} >פתיחת התראות</section>
      <section onClick={doLogout}>התנתקות</section>
    </div>
  );
}

export default Dashboard;