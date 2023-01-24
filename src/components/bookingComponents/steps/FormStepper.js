import React, { Children } from 'react';
import BookingUI from '../BookingUI';

const FormStepper = ({
  children,
  step,
  setStep,
  nextStep,
  setNextStep,
  handleSubmit,
  onSubmit,
  isValid,
  watch
}) => {
  const stepsArray = Children.toArray(children);
  const buttonNextStepper = () => {
 
      setNextStep(true);
      setStep(prev => prev + 1);
    
  };

  return (
    <>
      <BookingUI>

        <form
          onSubmit={e => {
            e.preventDefault();
          }}
          className="space-y-6"
        >                {console.log(watch())}

          {stepsArray[step]}
          {step < 6 && step !== 2 && step !== 3 ? (
            <button
              className="px-8 py-4 bg-[#f05623] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={buttonNextStepper}
              disabled={!isValid}
            >
              Continuer
            </button>
          ) : (
            ''
          )}

        
        <button className='px-8 py-4 bg-slate-700 text-white rounded w-full' onClick={()=>setStep(prev=>prev-1)}>Précedent</button>

        </form>
      </BookingUI>
    </>
  );
};

export default FormStepper;
