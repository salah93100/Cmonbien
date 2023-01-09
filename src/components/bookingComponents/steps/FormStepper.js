import React, { Children } from 'react'
import BookingUI from '../BookingUI'
import AdresseSelect from './AdresseSelect'

const FormStepper=({children,
  step,
  setStep,
  nextStep})=>{
  const stepsArray =Children.toArray(children)
  return (
    <><BookingUI>
      <form onSubmit={(e)=>{e.preventDefault()}} className="space-y-6">
       
        {console.log(step)}
      {stepsArray[step]}
      <button className='px-8 py-4 bg-blue-700 text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed' onClick={()=>setStep(prev=>prev+1)} disabled={nextStep} >Continuer</button>
      <button className='px-8 py-4 bg-slate-700 text-white rounded w-full' onClick={()=>setStep(prev=>prev-1)}>Précedent</button>
      </form>
   
    </BookingUI>
    </>
  )

}
 
export default FormStepper;
