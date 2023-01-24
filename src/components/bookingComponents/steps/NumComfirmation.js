import { useState,useEffect } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";


const NumComfirmation = ({
  children,
  booking,
  setBooking,
  register,
  errors,
  setStep,
  handleSubmit,
  setValue,
  onSubmit
}) => {
  const [formTel, setFormTel] = useState({phoneNum:"",codePhone:""
});
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);


  const handleChange=(e)=>{
 const {name,value}=e.target
 if (value.length <= 4) {
  setFormTel({...formTel,[name]:value})

  setDisabled(false);
}
  }
  
  const handleChangeNum=(phone)=>{
    
  

    setFormTel({...formTel,phoneNum: phone.replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .trim()})

    setValue("phoneNum",  phone.replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .trim())

  }
  const handleSubmitNum=()=>{ 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://app.cmonbien.fr/api/send-verification', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      phone: formTel.numPhone
    }));
    setDisabled(true)
    setOpen(true);


  }

  const handleSubmitCode=()=>{ 
 
    setStep(prev=>prev+1)

   handleSubmit(onSubmit)

  }

  useEffect(() => {
    if(formTel.phoneNum.length>=9){
      setDisabled(false)
    }
  }, [formTel]);
   
  return (
    <div className="space-y-6 ">
          {console.log(formTel.phoneNum)}

      <div className="text-center  space-6 ">
        <p className="text-4xl my-5">Numéro de Vérification</p>
        <PhoneInput
          containerClass="w-full"
          inputClass="w-full  flex border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#f05623] focus:ring-[#f05623] w-full rounded"
          buttonClass=""
          onlyCountries={['fr']}
          country={"fr"}
          placeholder="Entre votre numéro de tel ..."
          value={formTel.numPhone}
          onChange={(phone) => handleChangeNum(phone)}
          inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
        
        />
       
      </div>
      <button
        className="px-8 py-4 bg-[#f05623] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={handleSubmitNum}
       disabled={disabled}
        
      >
        Envoyer Le code de Vérification
      </button>
      {open ? (
        <>
       
          <input
            type="tel"
            name="codePhone"
            value={formTel.codePhone}
            className="flex border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#f05623] focus:ring-[#f05623] w-full rounded"
            placeholder="_ _ _ _"
            onChange={handleChange}
          />
          <button
            className="px-8 py-4 bg-[#f05623] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleSubmitCode}
          >
            Je veux recevoir mon estimation, cliquez ici!
          </button>{' '}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default NumComfirmation;
