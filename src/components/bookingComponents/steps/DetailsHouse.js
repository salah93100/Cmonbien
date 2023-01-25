import React from 'react';
import { useState, useEffect } from 'react';
import CounterStep from '../CounterStep';
import { motion } from 'framer-motion';

const DetailsHouse = ({ children, booking, setBooking, setStep ,register,errors,watch,setValue,setError,isValid}) => {
  const radioArray = [
    {
      id: 0,
      name: 'houseType',
      value: 'Individual House',
      type: 'House',
      placeHolder: 'Maison individuelle',
    },
    {
      id: 1,
      name: 'houseType',
      value: 'Group House',
      type: 'House',
      placeHolder: 'Maison mitoyenne ou jumelée',
    },
    {
      id: 2,
      name: 'houseType',
      value: 'Appartement',
      type: 'Appartement',
      placeHolder: 'Appartement',
    },
    {
      id: 3,
      name: 'houseType',
      value: 'DuplexAtique',
      type: 'Appartement',
      placeHolder: 'Duplex en attique (Appartement Duplex sur Toit Terrasse)',
    },
    {
      id: 4,
      name: 'houseType',
      value: 'Atique',
      type: 'Appartement',
      placeHolder: 'Attique (Appartement toit terrasse)',
    },
  ];
  const CheckExtraArray = [
    {
      id: 0,
      name: 'Vue dégagée',
      value: 'Individual House',
      type: 'All',
      placeHolder: 'Vue dégagée',
    },
    {
      id: 1,
      name: 'Piscine',
      value: 'Individual House',
      type: 'House',
      placeHolder: 'Piscine',
    },
    {
      id: 2,
      name: 'Jardin',
      value: 'Individual House',
      type: 'Appartement',
      placeHolder: 'Jardin',
    },
    {
      id: 3,
      name: 'Ascenseur',
      value: 'Individual House',
      type: 'Appartement',
      placeHolder: 'Ascenseur',
    },
  ];

  const [checked, setChecked] = useState(0);
  const [stepCompoments, setStepCompoments] = useState(0);
  const [checkedExtra, setCheckedExtra] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [stageApart, setStageApart] = useState(watch('stageApart'));
  useEffect(() => {
    setBooking({ ...booking, stageApart: stageApart });
  }, [stageApart]);
  useEffect(() => {
    if (stepCompoments > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [stepCompoments]);

  const nextStepper = () => {
    if (stepCompoments !== 0) {
    
    }
    if (stepCompoments === 2) {
      setStep(prev => prev + 1);
      window.scrollTo({top:0});
    } else {
      setStepCompoments(prev => prev + 1);
    }
  };




  useEffect(()=>{

  },[])

  return (
    <div className="space-y-6 flex flex-col gap-1">
      {console.log(isValid)}
      <motion.div
    initial={{y:100}} 
    transition={{duration:0.3}}
     whileInView={{y:0}}
     viewport={{once:true}}
    >
      <p class="px-8 py-4 bg-[#005c7c]  rounded-md rounded-bl-none text-white">
        Type {booking.houseOptions === 'House' ? 'de Maison' : "d'Appartement"}
      </p>
      </motion.div>

      <div className="flex flex-col gap-3">
      
        {radioArray.map(radio => {
          return (
            radio.type === booking.houseOptions && (
              <motion.div
              initial={{y:100}} 
              transition={{duration:0.5}}
               whileInView={{y:0}}
               viewport={{once:true}}
               className="flex flex-col "
              >
              <label
                className={`border w-full text-left  px-8 py-4 rounded ${
                watch('houseType') === radio.value ? 'border-[#005c7c]' : ''
                } `}
              >
                <input
                  type="radio"
                  id={radio.id}
                  {...register(
                    radio.name,
                    { required: 'Choisir option Type' }
                  )}
                  value={radio.value}
                  className="mr-2 checked:bg-blue-500 "
                 
                />

                {radio.placeHolder}
              </label>
              </motion.div>   
            )
          );
        })}

        <motion.div
              initial={{y:100}} 
              transition={{duration:0.4}}
               whileInView={{y:0}}
               viewport={{once:true}}
              className="w-full inline-flex flex-col gap-2">
       
          {watch('houseOptions') === 'Appartement' &&
          watch('houseType') ? (
            <>
             <p className="px-8 py-4 bg-[#005c7c] text-white rounded-md rounded-bl-none">
                A quel étage se trouve l'appartement ?
              </p>
              <CounterStep register={register} setValue={setValue} watch={watch} name={'NumberStepAppartment'} id={'Appart'} label={'À quel étage est situé l’appartement ?'} array={'stageApart'} setError={setError} errors={errors} min={1} max={50}/>
              <CounterStep register={register} setValue={setValue} watch={watch} name={'NumberStepBuilding'} id={'Building'} label={'Nombre d’étages de l’immeuble'} array={'stageApart'} setError={setError} errors={errors} min={1} max={50}/>
            </>
          ) : (
            ''
          )}
       </motion.div>
        {CheckExtraArray.map(extra => {
          return (
            (extra.type === booking.houseOptions || extra.type === 'All') &&
            stepCompoments > 0 && (
              <motion.div
              initial={{y:100}} 
              transition={{duration:0.4}}
               whileInView={{y:0}}
               viewport={{once:true}}
              className="w-full inline-flex flex-col gap-2">
              <label
                className={`border w-full text-left  px-8 py-4 rounded ${
                  watch(`extra.${extra.name}`)=== true ? 'border-[#005c7c]' : ''
                }`}
              >
                <input
                  type="checkbox"
                  id={extra.id}
                  {...register(`extra.${extra.name}`)}
                  
                  className="mr-2"
             
                />
                {extra.placeHolder}
              </label>
              </motion.div>
            )
          );
        })}

        {stepCompoments > 1 ? (
          <>
           <motion.div
              initial={{y:100}} 
              transition={{duration:0.3}}
               whileInView={{y:0}}
               viewport={{once:true}}
              className="w-full inline-flex flex-col gap-2">
            <p className="px-8 py-4 bg-[#005c7c] text-white rounded-md rounded-bl-none">
              Super! Nous sommes presque prêts à évaluer votre maison
            </p>
            </motion.div>
            <motion.div
              initial={{y:100}} 
              viewport={{once:true}}
              transition={{duration:0.5}}
               whileInView={{y:0}}>
                
            <p className="px-8 py-4 bg-[#005c7c] text-white rounded-md rounded-bl-none">
              Êtes-vous le propriétaire de ce bien?
            </p>
            </motion.div>
            <motion.div
              initial={{y:100}} 
              transition={{duration:0.6}}
               whileInView={{y:0}}
               viewport={{once:true}}
               className="flex flex-col gap-2 md:gap-4">
            <label
              className={`border w-full text-left  px-8 py-4 rounded  ${
                watch('owner') === 'Propriétaire' ? 'border-[#005c7c]' : ''
              }`}
            >
              <input
                type="radio"
                id="house"
                {...register("owner" ,{ required: 'Erreur choisir un type de propriéter' })}
  
                value="Propriétaire"
                className="mr-2"
             
              />
              Propriétaire
            </label>
            <label
              className={`border w-full text-left  px-8 py-4 rounded  ${
               watch('owner') === 'Locataire' ? 'border-[#005c7c]' : ''
              }`}
            >
              <input
                type="radio"
                id="house"
                {...register("owner" ,{ required: 'Erreur choisir un type de propriéter' })}
                value="Locataire"
                className="mr-2"
              
              />
              Locataire
            </label>
            </motion.div>
          </>
        ) : (
          ''
        )}
      </div>
     
      <button
        className={`px-8 py-4 bg-[#005c7c] text-white rounded w-full ${isValid&&"hover:bg-[#ffffff] hover:text-[#005c7c] hover:border hover:border-[#005c7c]"}  disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed`}
        onClick={nextStepper}
        disabled={!isValid}
      >
        Continuer{' '}
      </button>
    </div>
  );
};

export default DetailsHouse;
