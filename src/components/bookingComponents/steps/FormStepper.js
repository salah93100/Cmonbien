import React, { Children } from 'react';
import BookingUI from '../BookingUI';
import { motion } from 'framer-motion';

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
  const buttonPrecedStepper = () => {
 
    if(step>0){
      setStep(prev => prev -1);

    }
  
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

          <motion.div
    initial={{y:100}} 
    transition={{duration:0.6}}
     whileInView={{y:0}}
     viewport={{once:true}}
     className="flex flex-col gap-4"
    >
          
          {step < 6 && step !== 2 && step !== 3 ? (
            <button
              className={`px-8 py-4 bg-[#005c7c] text-white rounded w-full ${isValid&&"hover:bg-[#ffffff] hover:text-[#005c7c] hover:border hover:border-[#005c7c]"}  disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed`}
              onClick={buttonNextStepper}
              disabled={!isValid}
            >
              Continuer
            </button>
          ) : (
            ''
          )}

        
        <button className='px-8 py-4 bg-slate-700 text-white rounded w-full hover:bg-[#ffffff] hover:text-slate-700 hover:border hover:border-slate-700 ' onClick={buttonPrecedStepper}>Précedent</button>
        </motion.div>
        </form>
      </BookingUI>
    </>
  );
};

export default FormStepper;
