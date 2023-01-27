import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormStepper from '../components/bookingComponents/steps/FormStepper';
import AdresseSelect from '../components/bookingComponents/steps/AdresseSelect';
import HouseSelect from '../components/bookingComponents/steps/HouseSelect';
import DetailsHouse from '../components/bookingComponents/steps/DetailsHouse';
import SurfaceSelect from '../components/bookingComponents/steps/SurfaceSelect';
import SaleSelect from '../components/bookingComponents/steps/SaleSelect';
import VerificationSelect from '../components/bookingComponents/steps/VerificationSelect';
import NumComfirmation from '../components/bookingComponents/steps/NumComfirmation';
import MessageConfirmation from '../components/bookingComponents/steps/MessageConfirmation';

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      adress: '',
      houseOptions: '',
    },
  });

  const [step, setStep] = useState(0);
  const [nextStep, setNextStep] = useState(true);
  const [booking, setBooking] = useState({
    adress: '',
    houseOptions: '',
    houseType: '',
    stageApart: {},
    owner: '',
    surface: { Surface: 0, SurTerrain: 0, SurfaceBalcon: 0 },
    yearsBuild: 1900,
    yearsRenovated: 1900,
    renovated: null,
    nombreRoom: {},
    sellingHouse: '',
  });
  const onSubmit = data => {
    console.log(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://app.cmonbien.fr/api/submit-form');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function (event) {
      if (xhr.status !== 200) {
        // analyse l'état HTTP de la réponse
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else {
        // show the result
        alert(`Done, got ${xhr.response.length} bytes`); // response est la réponse du serveur
      }
    };

    xhr.send(JSON.stringify(data));
  };
  //  setStep(prev => prev + 1);

  return (
    <>
      <FormStepper
        step={step}
        setStep={setStep}
        nextStep={nextStep}
        setNextStep={setNextStep}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isValid={isValid}
        watch={watch}
      >
        <AdresseSelect
          setBooking={setBooking}
          booking={booking}
          nextStep={nextStep}
          setNextStep={setNextStep}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          isValid={isValid}
          required
        />
        <HouseSelect
          setBooking={setBooking}
          booking={booking}
          setNextStep={setNextStep}
          register={register}
          errors={errors}
          watch={watch}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          required
        />
        <DetailsHouse
          setBooking={setBooking}
          booking={booking}
          setStep={setStep}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          setError={setError}
          isValid={isValid}
        />
        <SurfaceSelect
          setBooking={setBooking}
          booking={booking}
          setStep={setStep}
          nextStep={nextStep}
          setNextStep={setNextStep}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          setError={setError}
          isValid={isValid}
        />
        <SaleSelect
          setBooking={setBooking}
          booking={booking}
          nextStep={nextStep}
          setNextStep={setNextStep}
          isValid={isValid}
          register={register}
          errors={errors}
          watch={watch}
        />
        <VerificationSelect
          setBooking={setBooking}
          booking={booking}
          nextStep={nextStep}
          setNextStep={setNextStep}
          register={register}
          errors={errors}
          isValid={isValid}
          required
        />
        <NumComfirmation
          setStep={setStep}
          isValid={isValid}
          Controller={Controller}
          control={control}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <MessageConfirmation isValid={isValid} />
      </FormStepper>
    </>
  );
}
