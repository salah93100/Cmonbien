import React from 'react';
import { useState, useEffect } from 'react';
import CounterStep from '../CounterStep';

const SurfaceSelect = ({ children, booking, setBooking, setStep,register,watch,setValue,setError,errors,isValid}) => {
  const [disabled, setDisabled] = useState(true);

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
      min:1,
      max:20
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberBathroom',
      value: counterArrayRoom.numberBathroom,
      placeHolder: 'Nombre de salles de bain',
      min:1,
      max:5
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberParkingIn',
      value: counterArrayRoom.numberParkingIn,
      placeHolder: 'Nombre de places de parking couvertes',
      min:0,
      max:6
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberParkingOut',
      value: counterArrayRoom.numberParkingOut,
      placeHolder: 'Nombre de places de parking extérieures',
      min:0,
      max:6
    },
  ];

  const [stepCompoments, setStepCompoments] = useState(0);

  const [counterSuface, setCounterSuface] = useState({
    Surface: 0,
    SurfaceBalcon: 0,
    SurTerrain: 0,
  });

  const increaseCounterAppart = e => {
    const { name, id,value } = e.target;
    if (id === 'ArrayCounterRoomParking') {
     
      setCounterArrayRoom(prevState => ({
        ...counterArrayRoom,
        [name]:  Number(prevState[name]) + 1,
      }));
      setBooking({ ...booking, nombreRoom: counterArrayRoom });

    }
     
    
    
    else {
      setCounterSuface(prevState => ({
        ...counterSuface,
        [name]: Number(prevState[name]) + 1,
      }));
      setBooking({ ...booking, surface: counterSuface });
    }
    setDisabled(false);
  };

  const decreaseCounterAppart = e => {
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
    const { name,value,id } = e.target;
    
      
    if (id === 'ArrayCounterRoomParking') {
    setBooking({...booking,nombreRoom:{...booking.nombreRoom,[name]:value}});
    setCounterArrayRoom({...counterArrayRoom,[name]:value})

    }
    else{
    setBooking({...booking,surface:{...booking.surface,[name]:value}});
    setCounterSuface({...counterSuface,[name]:value})}
  };

  useEffect(() => {
    if (stepCompoments > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [stepCompoments]);
  return (
    <div className="space-y-6">
      <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
        Cette étape est la plus importante!
      </p>
      <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
        Assurez-vous de répondre soigneusement aux prochaines questions afin
        d'obtenir l'évaluation la plus précise possible.
      </p>
      <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
        Quelle est la surface habitable de l'appartement? Surface (Carrez) m
      </p>

      <div className="w-full inline-flex flex-col gap-2">
      <CounterStep register={register} setValue={setValue} watch={watch} name={'Surface'} id={'Surface'} label={'Surface (Carrez) m² 1'}
       array={'counterSuface'} setError={setError} errors={errors} 
       min={5}
       max={1000}/>
      <CounterStep register={register} setValue={setValue} watch={watch} name={'SurfaceBalcon'} id={'SurfaceBalcon'} label={'Surface des balcons m²'} array={'counterSuface'} setError={setError} errors={errors} min={200}
       max={500}/>
      <CounterStep register={register} setValue={setValue} watch={watch} name={'SurfaceTerrain'} id={'SurfaceTerrain'} label={'Surface du terrain m²'} array={'counterSuface'} setError={setError} errors={errors} min={10}
       max={100000}/>

       
    
      </div>

     
 
      {stepCompoments > 0 ? (
        <>
          <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
            Quelle est l'année de construction de la maison?
          </p>
          <div className='flex inline-flex	flex-col	w-full gap-2'>
          <label for="yearsBuild">Année de construction</label>
          <input
            
            type="number"
            {...register("yearsBuild", 
            {required:'La valeur ne peu être nulle' ,
            maxLength : {
              value: 4,
              message: 'date au format YYYY' // JS only: <p>error message</p> TS only support string
            },
            max: {
              value:2025,
              message: `Erreur: l'année de rénovation ne peut étre supérieur à 2025` // JS only: <p>error message</p> TS only support string
            },
            min: {
              value:1700 ,
              message: `Erreur: l'année de rénovation ne peut étre inférieur à 1700` // JS only: <p>error message</p> TS only support string
            }
          })}
          value={watch("yearsBuild")}
            className="inline-flex border px-8 py-4 rounded text-center w-full focus:outline-none focus:ring-1 focus:border-[#f05623] focus:ring-[#f05623]"
          />
          {errors.yearsBuild && <p className="text-red-600 ">{errors.yearsBuild.message}</p>}
          </div>


        </>
      ) : (
        ''
      )}

      {stepCompoments > 1 ? (
        <>
          <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
          Votre bien a-t-il été rénové ?
          </p>
          <div className="flex flex-col gap-3">
            <label
              className={`border w-full text-left  px-8 py-4 rounded ${
                watch("renovated")=== "true" ? 'border-[#f05623]' : ''
              }`}
            >
              <input
                type="radio"
                
                {...register("renovated",{required:"choisire une option"})}
                value={true}
                className="mr-2"
           
              />
              Oui
            </label>

            <label
              className={`border w-full text-left  px-8 py-4 rounded ${
              watch("renovated") === "false" ? 'border-[#f05623]' : ''
              }`}
            >
              <input
                type="radio"
              
                
                {...register("renovated",{required:"choisire une option"})}
                value={false}
                className="mr-2"
           
              />
              Non
            </label>
          </div>
        </>
      ) : (
        ''
      )}
      {stepCompoments > 1 &&  watch("renovated") === "true" ? (
        <>
          <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
            Année de rénovation
          </p>
          <div className='flex inline-flex	flex-col	w-full gap-2'>
          <label for="yearsRenovated">Année de rénovation</label>

          <input
           
            type="number"
            {...register("yearsRenovated", 
            {required:'La valeur ne peu être nulle' ,
            maxLength : {
              value: 4,
              message: 'date au format YYYY' // JS only: <p>error message</p> TS only support string
            },
            max: {
              value:2025,
              message: `Erreur: l'année de rénovation ne peut étre supérieur à 2025` // JS only: <p>error message</p> TS only support string
            },
            min: {
              value:1700 ,
              message: `Erreur: l'année de rénovation ne peut étre inférieur à 1700` // JS only: <p>error message</p> TS only support string
            }
          })}
          
                 value={watch("yearsRenovated")}
            className="inline-flex border px-8 py-4 rounded text-center w-full focus:outline-none focus:ring-1 focus:border-[#f05623] focus:ring-[#f05623]"
          />

{errors.yearsRenovated && <p className="text-red-600 ">{errors.yearsRenovated.message}</p>}
</div>

        </>
      ) : (
        ''
      )}
      {stepCompoments > 2 ? (
        <>
          <div className="w-full inline-flex flex-col gap-2">
            {ArrayCounterRoomParking.map(counter => {
              return (
                <>
                      <CounterStep 
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

               
                </>
              );
            })}
          </div>
        </>
      ) : (
        ''
      )}

      <button
        className="px-8 py-4 bg-[#f05623] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={nextStepper}
        disabled={!isValid}
      >
        {console.log(errors)}
        Continuer{' '}
      </button>
    </div>
  );
};

export default SurfaceSelect;
