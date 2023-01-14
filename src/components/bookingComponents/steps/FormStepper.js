import React, { Children } from 'react';
import BookingUI from '../BookingUI';


const FormStepper=({children,
  step,
  setStep,
  nextStep,
  setNextStep,
  handleSubmit,
  onSubmit})=>{
  const stepsArray =Children.toArray(children)
  const buttonNextStepper =()=>{

    if(!nextStep){
    setNextStep(true)
    setStep(prev=>prev+1)
}
  }
  

  return (
    <><BookingUI>
      <form onSubmit={(e)=>{e.preventDefault()}} className="space-y-6">
      {stepsArray[step]}
      {step<5&&step!==2&&step!==3?(<button className='px-8 py-4 bg-[#075b97] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed'
       onClick={buttonNextStepper} disabled={nextStep} >Continuer</button>
):("")}

{step===5&& (
  <button className='px-8 py-4 bg-[#075b97] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed' onClick={handleSubmit(onSubmit)} >Finaliser et soumettre</button>

)}

      </form>
   
    </BookingUI>

    </>
  );
};

export default FormStepper;
