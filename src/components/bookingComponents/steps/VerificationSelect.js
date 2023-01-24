import React from 'react';
import { useState } from 'react';

const VerificationSelect = ({
  children,
  booking,
  setBooking,
  register,
  errors,
}) => {
  const [validState, setValidState] = useState({});
  const handleChangeInput = e => {
    const { name, value } = e.target;
    setValidState({ ...validState, [name]: value });
  };
  return (
    <div className="space-y-6">
      <h1 className="text-4xl text-center">Verification</h1>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Email"
          {...register('email', {
            required: 'Votre email est requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email non valide',
            },
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          className="inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#f05623] focus:ring-[#f05623]"
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          {...register(
            'firstName',
            { required: 'Votre Prénom est requis' },
            { pattern: /^[A-Za-z]+$/i }
          )}
          className="inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#f05623] focus:ring-[#f05623]"
        />
        {errors.firstName && (
          <p className="text-red-400">{errors.firstName.message}</p>
        )}
        <input
          type="text"
          name="lastName"
          placeholder="Nom de famille"
          {...register(
            'lastName',
            { required: 'Votre Nom est requis' },
            { pattern: /^[A-Za-z]+$/i }
          )}
          className="inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#f05623] focus:ring-[#f05623]"
        />
        {errors.lastName && (
          <p className="text-red-400"> {errors.lastName.message}</p>
        )}
      </div>
    </div>
  );
};

export default VerificationSelect;
