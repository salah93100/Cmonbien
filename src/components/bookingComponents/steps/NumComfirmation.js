import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { motion } from 'framer-motion';

const NumComfirmation = ({
  children,
  booking,
  setBooking,
  register,
  errors,
  setStep,
  handleSubmit,
  setValue,
  onSubmit,
}) => {
  const [formTel, setFormTel] = useState({ phoneNum: '', codePhone: '' });
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChangeCode = event => {
    const code = event.target.value;

    setFormTel({
      ...formTel,
      phoneCode: code,
    });

    if (code.length > 4) {
      event.preventDefault();
      event.stopPropagation();

      setDisabled(true);

      return;
    }

    setValue('phoneCode', code);

    if (code.length == 4) {
      setDisabled(false);
    }
  };

  const handleChangeNum = phone => {
    setFormTel({
      ...formTel,
      phoneNum: phone
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1')
        .trim(),
    });

    setValue(
      'phoneNum',
      phone
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1')
        .trim()
    );
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
    setOpen(true);
  };

  const handleSubmitCode = () => {
    onSubmit();
  };

  useEffect(() => {
    if (formTel.phoneNum.length >= 9) {
      setDisabled(false);
    }
  }, [formTel]);

  return (
    <div className="space-y-6 flex flex-col gap-2 ">
      {console.log(formTel.phoneNum)}

      <div className="text-center  space-6 ">
        <p className="text-4xl my-5">Numéro de Vérification</p>
        <motion.div
          initial={{ y: 100 }}
          transition={{ duration: 0.3 }}
          whileInView={{ y: 0 }}
          className="w-full  "
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
              const phoneNum = data.dialCode + value.slice(1, 10)

              setFormTel({ ...formTel, phoneNum, })
            }}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
            }}
          />
        </motion.div>
      </div>
      <button
        className="px-8 py-4 bg-[#005c7c] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={handleSubmitNum}
        disabled={disabled}
      >
        Envoyer Le code de Vérification
      </button>
      {open ? (
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
              onClick={handleSubmitCode}
            >
              Je veux recevoir mon estimation, cliquez ici!
            </button>
          </motion.div>{' '}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default NumComfirmation;
