import React from 'react';
import { useState, useEffect } from 'react';
import CounterStep from '../CounterStep';
import { motion } from 'framer-motion';

const SurfaceSelect = ({
  children,
  booking,
  setBooking,
  setStep,
  register,
  watch,
  setValue,
  setError,
  errors,
  isValid,
  clearErrors,
  getFieldState,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);

  const [counterArrayRoom, setCounterArrayRoom] = useState({
    numberRoom: 0,
    numberBathroom: 0,
    numberParkingIn: 0,
    numberParkingOut: 0,
  });
  const ArrayCounterRoomParking = [
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberRoom',
      value: counterArrayRoom.numberRoom,
      placeHolder: 'Nombre de pièces',
      min: 1,
      max: 20,
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberBathroom',
      value: counterArrayRoom.numberBathroom,
      placeHolder: 'Nombre de salles de bain',

      min: 1,
      max: 5,
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberParkingIn',
      value: counterArrayRoom.numberParkingIn,
      placeHolder: 'Nombre de places de parking couvertes',
      min: 0,
      max: 6,
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberParkingOut',
      value: counterArrayRoom.numberParkingOut,
      placeHolder: 'Nombre de places de parking extérieures',
      min: 0,
      max: 6,
    },
  ];

  const [stepCompoments, setStepCompoments] = useState(0);

  const [counterSuface, setCounterSuface] = useState({
    Surface: 0,
    SurfaceBalcon: 0,
    SurTerrain: 0,
  });

  const increaseCounterAppart = e => {
    setDisabled(true);

    const { name, id, value } = e.target;
    console.log(id);
    if (id === 'ArrayCounterRoomParking') {
      setCounterArrayRoom(prevState => ({
        ...counterArrayRoom,
        [name]: Number(prevState[name]) + 1,
      }));
      setBooking({ ...booking, nombreRoom: counterArrayRoom });
    } else {
      setCounterSuface(prevState => ({
        ...counterSuface,
        [name]: Number(prevState[name]) + 1,
      }));
      setBooking({ ...booking, surface: counterSuface });
    }
    setDisabled(false);
  };

  useEffect(() => {
    console.log('ok');
    if (errors.counterArrayRoom) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [disabled]);

  const decreaseCounterAppart = e => {
    setDisabled(true);

    const { name, id } = e.target;
    if (id === 'ArrayCounterRoomParking') {
      if (counterArrayRoom[name] > 0) {
        setCounterArrayRoom(prevState => ({
          ...counterArrayRoom,
          [name]: prevState[name] - 1,
        }));
        setBooking({ ...booking, nombreRoom: counterArrayRoom });
        setDisabled(false);
      }
    } else {
      if (counterSuface[name] > 0) {
        setCounterSuface(prevState => ({
          ...counterSuface,
          [name]: prevState[name] - 1,
        }));
        setBooking({ ...booking, surface: counterSuface });
        setDisabled(false);
      }
    }
  };

  const handleInput = e => {
    setDisabled(true);

    const { name, value } = e.target;
    if (name === 'yearsBuild' || name === 'yearsRenovated') {
      if (value.length <= 4) {
        setBooking({ ...booking, [name]: value });
        setDisabled(false);
      }
    } else {
      setBooking({ ...booking, [name]: JSON.parse(value) });
      setDisabled(false);
    }
  };

  const nextStepper = () => {
    if (stepCompoments > 2) {
      setStep(prev => prev + 1);
    } else {
      setStepCompoments(prev => prev + 1);
    }
  };

  const handleChangeInput = e => {
    setDisabled(true);

    const { name, value, id } = e.target;

    if (id === 'ArrayCounterRoomParking') {
      setBooking({
        ...booking,
        nombreRoom: { ...booking.nombreRoom, [name]: value },
      });
      setCounterArrayRoom({ ...counterArrayRoom, [name]: value });
    } else {
      setBooking({
        ...booking,
        surface: { ...booking.surface, [name]: value },
      });
      setCounterSuface({ ...counterSuface, [name]: value });
    }
  };

  useEffect(() => {
    if (stepCompoments > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [stepCompoments]);
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: 100 }}
        transition={{ duration: 0.3 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
      >
        <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
          Cette étape est la plus importante!
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        transition={{ duration: 0.5 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
      >
        <p className="px-8 py-4 bg-[#075b9725] rounded-md rounded-bl-none">
          Assurez-vous de répondre soigneusement aux prochaines questions afin
          d'obtenir l'évaluation la plus précise possible.
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        transition={{ duration: 0.7 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
      >
        <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
          Quelle est la surface habitable de{' '}
          {watch('houseOptions') == 'Appartement'
            ? "l'appartement"
            : 'la maison'}
          ? Surface (Carrez)
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        transition={{ duration: 0.8 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        className="w-full inline-flex flex-col gap-2"
      >
        <CounterStep
          register={register}
          setValue={setValue}
          watch={watch}
          name={'Surface'}
          id={'Surface'}
          label={'Surface (Carrez) m²'}
          array={'counterSuface'}
          setError={setError}
          errors={errors}
          min={5}
          max={1000}
          clearErrors={clearErrors}
        />
        <CounterStep
          clearErrors={clearErrors}
          register={register}
          setValue={setValue}
          watch={watch}
          name={'SurfaceBalcon'}
          id={'SurfaceBalcon'}
          label={'Surface des balcons m²'}
          array={'counterSuface'}
          setError={setError}
          errors={errors}
          min={0}
          max={500}
        />
        {watch('houseOptions') === 'House' ? (
          <CounterStep
            clearErrors={clearErrors}
            register={register}
            setValue={setValue}
            watch={watch}
            name={'SurfaceTerrain'}
            id={'SurfaceTerrain'}
            label={'Surface du terrain m²'}
            array={'counterSuface'}
            setError={setError}
            errors={errors}
            min={watch('houseOptions') === 'House' ? 10 : 0}
            max={100000}
          />
        ) : (
          ''
        )}
      </motion.div>

      {stepCompoments > 0 ? (
        <>
          <motion.div
            initial={{ y: 100 }}
            transition={{ duration: 0.3 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
              Quelle est l'année de construction de {' '}
              {watch('houseOptions') === 'House'
                ? 'la maison'
                : "l'appartement"}
              ?
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 100 }}
            transition={{ duration: 0.6 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="flex inline-flex	flex-col	w-full gap-2"
          >
            <label for="yearsBuild">Année de construction</label>
            <input
              type="number"
              {...register('yearsBuild', {
                required: 'La valeur ne peu être nulle',
                maxLength: {
                  value: 4,
                  message: 'date au format YYYY', // JS only: <p>error message</p> TS only support string
                },
                max: {
                  value: 2025,
                  message: `L'année de rénovation ne peut étre supérieur à 2025`, // JS only: <p>error message</p> TS only support string
                },
                min: {
                  value: 1700,
                  message: `L'année de rénovation ne peut étre inférieur à 1700`, // JS only: <p>error message</p> TS only support string
                },
              })}
              value={watch('yearsBuild')}
              className="inline-flex border px-8 py-4 rounded text-center w-full focus:outline-none focus:ring-1 focus:border-[#005c7c] focus:ring-[#005c7c]"
            />
            {errors.yearsBuild && (
              <p className="text-red-600 ">{errors.yearsBuild.message}</p>
            )}
          </motion.div>
        </>
      ) : (
        ''
      )}

      {stepCompoments > 1 ? (
        <>
          <motion.div
            initial={{ y: 100 }}
            transition={{ duration: 0.3 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
              Votre bien a-t-il été rénové ?
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 100 }}
            transition={{ duration: 0.6 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <label
              className={`border w-full text-left  px-8 py-4 rounded ${
                watch('renovated') === 'true' ? 'border-[#005c7c]' : ''
              }`}
            >
              <input
                type="radio"
                {...register('renovated', { required: 'choisire une option' })}
                value={true}
                className="mr-2"
              />
              Oui
            </label>

            <label
              className={`border w-full text-left  px-8 py-4 rounded ${
                watch('renovated') === 'false' ? 'border-[#005c7c]' : ''
              }`}
            >
              <input
                type="radio"
                {...register('renovated', { required: 'choisire une option' })}
                value={false}
                className="mr-2"
              />
              Non
            </label>
          </motion.div>
        </>
      ) : (
        ''
      )}
      {stepCompoments > 1 && watch('renovated') === 'true' ? (
        <>
          <motion.div
            initial={{ y: 100 }}
            transition={{ duration: 0.3 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <p className="px-8 py-4 bg-[#075b9725] rounded-md rounded-bl-none">
              Année de rénovation
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 100 }}
            transition={{ duration: 0.3 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="flex 	flex-col	w-full gap-2"
          >
            <label for="yearsRenovated">Année de rénovation</label>

            <input
              type="number"
              {...register('yearsRenovated', {
                required: 'La valeur ne peu être nulle',
                maxLength: {
                  value: 4,
                  message: 'date au format YYYY', // JS only: <p>error message</p> TS only support string
                },
                max: {
                  value: 2025,
                  message: `L'année de rénovation ne peut étre supérieur à 2025`, // JS only: <p>error message</p> TS only support string
                },
                min: {
                  value: 1700,
                  message: `L'année de rénovation ne peut étre inférieur à 1700`, // JS only: <p>error message</p> TS only support string
                },
              })}
              value={watch('yearsRenovated')}
              className="inline-flex border px-8 py-4 rounded text-center w-full focus:outline-none focus:ring-1 focus:border-[#005c7c] focus:ring-[#005c7c]"
            />

            {errors.yearsRenovated && (
              <p className="text-red-600 ">{errors.yearsRenovated.message}</p>
            )}
          </motion.div>
        </>
      ) : (
        ''
      )}
      {stepCompoments > 2 ? (
        <>
          <motion.div
            initial={{ y: 100 }}
            transition={{ duration: 0.3 }}
            whileInView={{ y: 0 }}
            className="w-full inline-flex flex-col "
            viewport={{ once: true }}
          >
            {ArrayCounterRoomParking.map((counter, index) => {
              return (
                <CounterStep
                  key={index}
                  clearErrors={clearErrors}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  name={counter.name}
                  id={counter.id}
                  label={counter.placeHolder}
                  array={'counterArrayRoom'}
                  setError={setError}
                  errors={errors}
                  min={counter.min}
                  max={counter.max}
                />
              );
            })}
          </motion.div>
        </>
      ) : (
        ''
      )}

      <button
        className={`px-8 py-4 bg-[#005c7c] text-white rounded w-full ${
          (isValid || valid) &&
          'hover:bg-[#ffffff] hover:text-[#005c7c] hover:border hover:border-[#005c7c]'
        }  disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed`}
        onClick={nextStepper}
        disabled={!isValid || !valid}
      >
        {console.log(errors)}
        Continuer{' '}
      </button>
    </div>
  );
};

export default SurfaceSelect;
