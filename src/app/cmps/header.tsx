import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <div className='header full'>
      <Link className='login-cmp' href={"/login"} >
      התחברות
      </Link>
      <p className='logo'>כוח אריאל-ביחד ננצח</p>
    </div>
  )
}

export default Header