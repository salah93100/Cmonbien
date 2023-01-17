import React from 'react';

export default function BookingUI({ children }) {
  return (
    <div className="max-h-screen w-full ">
      <section className="">
        <div className="flex justify-center	">
          <div className="max-w-md w-full my-8 py-8 mx-4">{children}</div>
        </div>
      </section>
    </div>
  );
}
