import React from 'react';
import FormStepper from '../components/bookingComponents/steps/FormStepper';
import AdresseSelect from '../components/bookingComponents/steps/AdresseSelect';
import HouseSelect from '../components/bookingComponents/steps/HouseSelect';
export default function Home() {
  return (
    <>
      <FormStepper>
        <AdresseSelect />
        <HouseSelect />
      </FormStepper>
    </>
  );
}
