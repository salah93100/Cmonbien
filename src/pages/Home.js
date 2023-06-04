import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormStepper from '../components/bookingComponents/steps/FormStepper';
import AdresseSelect from '../components/bookingComponents/steps/AdresseSelect';
import HouseSelect from '../components/bookingComponents/steps/HouseSelect';
import DetailsHouse from '../components/bookingComponents/steps/DetailsHouse';
import SurfaceSelect from '../components/bookingComponents/steps/SurfaceSelect';
import SaleSelect from '../components/bookingComponents/steps/SaleSelect';
import VerificationSelect from '../components/bookingComponents/steps/VerificationSelect';
import MessageConfirmation from '../components/bookingComponents/steps/MessageConfirmation';

export default function Home({ initialStep = 0, email = '' }) {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
    resetField,
    setValue,
    control,
    getFieldState,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      adress: '',
      houseOptions: '',
      counterArrayRoom: {
        numberBathroom: 0,
        numberParkingIn: 0,
        numberParkingOut: 0,
        numberRoom: 0,
      },
      stageApart: {
        NumberStepAppartment: 1,
        NumberStepBuilding: 1,
      },
      counterSuface: { Surface: 5, SurfaceBalcon: 0, SurfaceTerrain: 10 },
      yearsBuild: 1900,
      yearsRenovated: 1900,
    },
  });

  console.log(errors);

  const [step, setStep] = useState(initialStep);
  const [nextStep, setNextStep] = useState(true);
  const [booking, setBooking] = useState({
    lat: null,
    lng: null,
    adress: '',
    houseOptions: '',
    houseType: '',
    stageApart: {},
    owner: '',
    surface: { Surface: 0, SurTerrain: 0, SurfaceBalcon: 0 },
    counterArrayRoom: {
      numberBathroom: 0,
      numberParkingIn: 0,
      numberParkingOut: 0,
      numberRoom: 0,
    },

    yearsBuild: 1900,
    yearsRenovated: 1900,
    renovated: null,
    nombreRoom: {},
    sellingHouse: '',
  });

  useEffect(() => {
    setTimeout(() => {
      const $widget = document.querySelector('#widget-cmonbien'); // Array.from(document.querySelectorAll("p.px-8.py-4.rounded-md.rounded-bl-none")).slice(-1)[0]

      $widget.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const $widget = document.querySelector('#widget-cmonbien'); // Array.from(document.querySelectorAll("p.px-8.py-4.rounded-md.rounded-bl-none")).slice(-1)[0]

      $widget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 250);
  }, [step]);

  const onSubmit = async () => {
    const {
      lat,
      lng,
      adress,
      yearsBuild,
      yearsRenovated,
      firstName,
      lastName,
      email,
      houseOptions,
      houseType,
      counterSuface,
      stageApart,
      extra,
      sellingHouse,
      owner,
      renovated,
      counterArrayRoom,
      phoneNum,
      phoneCode,
    } = getValues();

    const data = {
      lat,
      lng,
      address: adress,
      'property-type': houseOptions == 'House' ? 'maison' : 'appartement',
      'house-type': houseType,
      'apartment-type': houseType,
      'apartment-floor': stageApart.NumberStepAppartment,
      'floors-in-building': stageApart.NumberStepBuilding,
      elevator: extra.Ascenseur ? 'yes' : 'no',
      'owner-radio': owner ? 'yes' : 'no',
      'garden-area':
        houseOptions == 'House' ? counterSuface.SurfaceTerrain : null,
      'floor-area': counterSuface.Surface,
      'balcony-area': counterSuface.SurfaceBalcon,
      'construction-year': yearsBuild.toString(),
      renovated: renovated ? 'yes' : 'no',
      'renovation-year': yearsRenovated.toString(),
      'number-of-rooms': counterArrayRoom.numberRoom,
      'number-of-bathrooms': counterArrayRoom.numberBathroom,
      'number-of-covered-parking': counterArrayRoom.numberParkingIn,
      'number-of-outdoor-parking': counterArrayRoom.numberParkingOut,
      'open-view': extra['Vue dégagée'] ? 'on' : '',
      'radio-wanting-to-sell': sellingHouse,
      email,
      fname: firstName,
      lname: lastName,
      phone: phoneNum,
      code: phoneCode,
      payload: getValues(),
    };

    await fetch('https://app.cmonbien.fr/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    window.location.href =
      'https://www.cmonbien.fr/estimation-valide?email=' + email;
  };

  return (
    <>
      <FormStepper
        step={step}
        setStep={setStep}
        nextStep={nextStep}
        setNextStep={setNextStep}
        getValues={getValues}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isValid={isValid}
        watch={watch}
      >
        <AdresseSelect
          resetField={resetField}
          setBooking={setBooking}
          booking={booking}
          nextStep={nextStep}
          setValue={setValue}
          getValues={getValues}
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
          clearErrors={clearErrors}
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
          getFieldState={getFieldState}
          clearErrors={clearErrors}
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
          setStep={setStep}
          register={register}
          errors={errors}
          isValid={isValid}
          onSubmit={onSubmit}
          setValue={setValue}
          required
        />

        <MessageConfirmation
          getValues={getValues}
          email={email}
          isValid={isValid}
        />
      </FormStepper>
    </>
  );
}
