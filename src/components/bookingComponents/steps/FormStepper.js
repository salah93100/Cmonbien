import React, { Children } from 'react';
import BookingUI from '../BookingUI';
import AdresseSelect from './AdresseSelect';

const FormStepper = ({ children }) => {
  const stepsArray = Children.toArray(children);
  return (
    <>
      <BookingUI>{stepsArray[0]}</BookingUI>
    </>
  );
};

export default FormStepper;
