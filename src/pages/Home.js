import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import FormStepper from '../components/bookingComponents/steps/FormStepper'
import AdresseSelect from '../components/bookingComponents/steps/AdresseSelect'
import HouseSelect from '../components/bookingComponents/steps/HouseSelect'
import DetailsHouse from '../components/bookingComponents/steps/DetailsHouse'
import SurfaceSelect from '../components/bookingComponents/steps/SurfaceSelect'
import SaleSelect from '../components/bookingComponents/steps/SaleSelect';
import VerificationSelect from '../components/bookingComponents/steps/VerificationSelect'
import NumComfirmation from '../components/bookingComponents/steps/NumComfirmation';
import MessageConfirmation from '../components/bookingComponents/steps/MessageConfirmation';

export default function Home() {
const { register, handleSubmit, formState: { errors } } = useForm();
 const onSubmit = data => console.log(data);
 const [step, setStep] = useState(6);
 const [nextStep, setNextStep] = useState(true);
 const [booking, setBooking] = useState({
  adress:"",
  houseOptions:"",
  houseType:"",
  stageApart:{},
  owner:"",
  surface:{},
  yearsBuild:1900,
  yearsRenovated:1900,
  renovated:false,
  nombreRoom:{},
  sellingHouse:""

 }
  
 );

  return(
    <>
    <FormStepper step={step} setStep={setStep} nextStep={nextStep} setNextStep={setNextStep} handleSubmit={handleSubmit} onSubmit={onSubmit}>
      {console.log(errors)}
        <AdresseSelect setBooking={setBooking} booking={booking} nextStep={nextStep} setNextStep={setNextStep}/> 
        <HouseSelect setBooking={setBooking} booking={booking} setNextStep={setNextStep}/>
        <DetailsHouse setBooking={setBooking} booking={booking} setStep={setStep}/>
        <SurfaceSelect setBooking={setBooking} booking={booking} setStep={setStep} nextStep={nextStep} setNextStep={setNextStep}/>
        <SaleSelect setBooking={setBooking} booking={booking} nextStep={nextStep} setNextStep={setNextStep}/>
        <VerificationSelect setBooking={setBooking} booking={booking} nextStep={nextStep} setNextStep={setNextStep} register={register} errors={ errors } required/>
        <NumComfirmation/>
        <MessageConfirmation/>
    </FormStepper>

    </>
  );
}
