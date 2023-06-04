import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';

const VerificationSelect = ({
  children,
  booking,
  setBooking,
  setStep,
  register,
  setValue,
  errors,
  onSubmit,
  isValid,
}) => {
  const [validState, setValidState] = useState({});
  const [formTel, setFormTel] = useState({ phoneNum: '', codePhone: '' });
  const [open, setOpen] = useState(true);
  const [stepVerification, setStepVerification] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [code, setCode] = useState('');

  useEffect(() => {
    register('phoneCode');
    register('phoneNum');
  }, []);

  const nextStepper = () => {
    if (stepVerification < 2) {
      setStepVerification(prev => prev + 1);
    } else {
      setStepVerification(prev => prev + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const handleSubmitNum = () => {
    fetch('https://app.cmonbien.fr/api/send-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        phone: formTel.phoneNum,
      }),
    });

    setDisabled(true);
    setStepVerification(prev => prev + 1);
    nextStepper();
  };

  const handleSubmitCode = () => {
    onSubmit();
    setStep(prev => prev + 1);
  };

  const handleChangeCode = event => {
    const code = event.target.value;

    setFormTel({
      ...formTel,
      codePhone: code,
    });

    if (code.length > 4) {
      event.preventDefault();
      event.stopPropagation();

      setDisabled(true);

      return;
    }

    setValue('phoneCode', code);
    setCode(code);

    console.log(code);

    if (code.length == 4) {
      setDisabled(false);
    }
  };
  useEffect(() => {
    if (formTel.phoneNum.length >= 9) {
      setDisabled(false);
    }
  }, [formTel]);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl text-center">Vos informations</h1>
      <p className={'text-xl text-center'}>Pour recevoir votre évaluation</p>
      <motion.div
        initial={{ y: 100 }}
        transition={{ duration: 0.3 }}
        whileInView={{ y: 0 }}
        className="flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Email"
          {...register('email', {
            required: 'Votre email est requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email non valide',
            },
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          className="inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#005c7c] focus:ring-[#005c7c]"
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          {...register(
            'firstName',
            { required: 'Votre Prénom est requis' },
            { pattern: /^[A-Za-z]+$/i }
          )}
          className="inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#005c7c] focus:ring-[#005c7c]"
        />
        {errors.firstName && (
          <p className="text-red-400">{errors.firstName.message}</p>
        )}
        <input
          type="text"
          name="lastName"
          placeholder="Nom de famille"
          {...register(
            'lastName',
            { required: 'Votre Nom est requis' },
            { pattern: /^[A-Za-z]+$/i }
          )}
          className="inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#005c7c] focus:ring-[#005c7c]"
        />
        {errors.lastName && (
          <p className="text-red-400"> {errors.lastName.message}</p>
        )}
      </motion.div>

      {
        //STEP CONFIRMATION----------------------------------------------------------
      }

      <div className="space-y-6 flex flex-col gap-2 ">
        {stepVerification > 0 ? (
          <div className="text-center  space-y-6 ">
            <p className="text-4xl my-5">Numéro de Vérification</p>
            <motion.div
              initial={{ y: 100 }}
              transition={{ duration: 0.3 }}
              whileInView={{ y: 0 }}
              className="w-full gap-4 flex flex-col "
            >
              <PhoneInput
                containerClass="w-full"
                inputClass="w-full  flex border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#005c7c] focus:ring-[#005c7c] w-full rounded"
                buttonClass=""
                disableCountryCode={true}
                onlyCountries={['fr']}
                alwaysDefaultMask={true}
                defaultMask={'.. .. .. .. ..'}
                country={'fr'}
                placeholder="Entre votre numéro de tel ..."
                onChange={(value, data, event, formattedValue) => {
                  const phoneNum = data.dialCode + value.slice(1, 10);

                  setFormTel({ ...formTel, phoneNum });
                  setValue('phoneNum', phoneNum);
                }}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
              />
              <button
                className="px-8 py-4 bg-[#005c7c] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={handleSubmitNum}
                disabled={disabled}
              >
                Envoyer Le code de Vérification
              </button>
            </motion.div>
          </div>
        ) : (
          ''
        )}

        {stepVerification > 0 ? (
          <>
            <motion.div
              initial={{ y: 100 }}
              transition={{ duration: 0.3 }}
              whileInView={{ y: 0 }}
              className="w-full"
            >
              <input
                name="codePhone"
                className="flex border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#005c7c] focus:ring-[#005c7c] w-full rounded"
                onChange={handleChangeCode}
                placeholder="_ _ _ _"
              />
            </motion.div>
            <motion.div
              initial={{ y: 100 }}
              transition={{ duration: 0.6 }}
              whileInView={{ y: 0 }}
              className="w-full"
            >
              <button
                className="px-8 py-4 bg-[#005c7c] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={
                  formTel.codePhone.length != 4 || formTel.phoneNum.length != 11
                }
                onClick={handleSubmitCode}
              >
                Je veux recevoir mon estimation, cliquez ici!
              </button>
            </motion.div>{' '}
          </>
        ) : (
          ''
        )}
        {stepVerification < 1 ? (
          <button
            id="continue-button"
            className={`px-8 py-4 bg-[#005c7c] text-white rounded w-full ${
              isValid &&
              'hover:bg-[#ffffff] hover:text-[#005c7c] hover:border hover:border-[#005c7c]'
            }  disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed`}
            onClick={nextStepper}
            disabled={!isValid}
          >
            Continuer{' '}
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default VerificationSelect;
