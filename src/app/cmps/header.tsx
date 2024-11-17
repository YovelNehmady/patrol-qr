import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-shrink flex-row-reverse '>
      <Link className='pl-2' href={"/login"} >
      התחברות
      </Link>
      <Link href={"/qr"} >
      QR
      </Link>
      <p className='logo flex-1'> כח אריאל</p>
    </div>
  )
}

export default Header