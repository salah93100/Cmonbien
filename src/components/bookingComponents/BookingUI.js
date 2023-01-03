import React, { Children } from 'react';

export default function BookingUI({ children }) {
  return (
    <div className="max-h-screen w-full overflow-hidden">
      <div className="flex justify-center">
        <div className="max-w-md w-full">{children}</div>
      </div>
    </div>
  );
}
