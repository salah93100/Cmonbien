import React from 'react';

export default function BookingUI({ children }) {
  return (

    <div className='max-h-screen w-full '>
        <div className='flex justify-center	'>
          <div className='max-w-md w-full  overflow-y-scroll'>{children}</div>
          </div>
        </div>
  )

}
