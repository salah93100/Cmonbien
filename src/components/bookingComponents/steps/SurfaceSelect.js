import React from 'react';
import { useState, useEffect } from 'react';

const SurfaceSelect = ({ children, booking, setBooking, setStep }) => {
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
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberBathroom',
      value: counterArrayRoom.numberBathroom,
      placeHolder: 'Nombre de salles de bain',
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberParkingIn',
      value: counterArrayRoom.numberParkingIn,
      placeHolder: 'Nombre de places de parking couvertes',
    },
    {
      id: 'ArrayCounterRoomParking',
      name: 'numberParkingOut',
      value: counterArrayRoom.numberParkingOut,
      placeHolder: 'Nombre de places de parking extérieures',
    },
  ];

  const [stepCompoments, setStepCompoments] = useState(0);

  const [counterSuface, setCounterSuface] = useState({
    Surface: 0,
    SurfaceBalcon: 0,
    SurTerrain: 0,
  });

  const increaseCounterAppart = e => {
    const { name, id } = e.target;
    if (id === 'ArrayCounterRoomParking') {
      setCounterArrayRoom(prevState => ({
        ...counterArrayRoom,
        [name]: prevState[name] + 1,
      }));
      setBooking({ ...booking, nombreRoom: counterArrayRoom });
    } else {
      setCounterSuface(prevState => ({
        ...counterSuface,
        [name]: prevState[name] + 1,
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
      console.log('sa passe');
      setBooking({ ...booking, [name]: JSON.parse(value) });
      setDisabled(false);
    }
  };

  const nextStepper = () => {
    if (stepCompoments > 2) {
      setStep(prev => prev + 1);
    } else {
      setStepCompoments(prev => prev + 1);
      setDisabled(true);
    }
  };
  useEffect(() => {
    if (stepCompoments > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [stepCompoments]);
  return (
    <div className="space-y-6">
      <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
        Cette étape est la plus importante!
      </p>
      <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
        Assurez-vous de répondre soigneusement aux prochaines questions afin
        d'obtenir l'évaluation la plus précise possible.
      </p>
      <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
        Quelle est la surface habitable de l'appartement? Surface (Carrez) m
      </p>

      <div className="w-full inline-flex flex-col">
        <label>Surface (Carrez) m²</label>
        {console.log(counterSuface)}
        <div className="rounded inline-flex">
          <button
            className="border px-8 py-4 rounded-l"
            id="Surface"
            name="Surface"
            onClick={decreaseCounterAppart}
          >
            -
          </button>
          <input
            type="tel"
            id="house"
            name="Surface"
            value={counterSuface.Surface}
            className="inline-flex  px-8 py-4 border text-center w-full"
          />

          <button
            className="border   px-8 py-4 rounded-r"
            id="Surface"
            name="Surface"
            onClick={increaseCounterAppart}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full inline-flex flex-col">
        <label>Surface des balcons m²</label>
        <div className="rounded inline-flex">
          <button
            className="border   px-8 py-4 rounded-l"
            id="SurfaceBalcon"
            name="SurfaceBalcon"
            onClick={decreaseCounterAppart}
          >
            -
          </button>
          <input
            type="tel"
            id="house"
            name="SurfaceBalcon"
            value={counterSuface.SurfaceBalcon}
            className="inline-flex border px-8 py-4  text-center w-full"
          />

          <button
            className="border   px-8 py-4 rounded-r"
            id="SurfaceBalcon"
            name="SurfaceBalcon"
            onClick={increaseCounterAppart}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full inline-flex flex-col">
        <label>Surface du terrain</label>
        <div className="rounded inline-flex">
          <button
            className="border px-8 py-4 rounded-l"
            id="SurTerrain"
            name="SurTerrain"
            onClick={decreaseCounterAppart}
          >
            -
          </button>
          <input
            type="tel"
            id="house"
            name="SurTerrain"
            value={counterSuface.SurTerrain}
            className="inline-flex border px-8 py-4  text-center w-full"
          />

          <button
            className="border   px-8 py-4 rounded-r"
            id="SurTerrain"
            name="SurTerrain"
            onClick={increaseCounterAppart}
          >
            +
          </button>
        </div>
      </div>
      {stepCompoments > 0 ? (
        <>
          <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
            Quelle est l'année de construction de la maison?
          </p>
          <input
            id="dateBuild"
            name="yearsBuild"
            type="number"
            min="1900"
            max="2022"
            step="1"
            value={booking.yearsBuild}
            onChange={handleInput}
            className="inline-flex border px-8 py-4 rounded text-center w-full focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97]"
          />
        </>
      ) : (
        ''
      )}

      {stepCompoments > 1 ? (
        <>
          <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
            Votre bien a il était rénnové
          </p>
          <div className="flex flex-col gap-3">
            <label
              className={`border w-full text-left  px-8 py-4 rounded ${
                booking.renovated === true ? 'border-[#075b97]' : ''
              }`}
            >
              <input
                type="radio"
                id="house"
                name="renovated"
                value={true}
                className="mr-2"
                onChange={handleInput}
                checked={booking.renovated === true}
              />
              OUI
            </label>

            <label
              className={`border w-full text-left  px-8 py-4 rounded ${
                booking.renovated === false ? 'border-[#075b97]' : ''
              }`}
            >
              <input
                type="radio"
                id="house"
                name="renovated"
                value={false}
                className="mr-2"
                onChange={handleInput}
                checked={booking.renovated === false}
              />
              Non
            </label>
          </div>
        </>
      ) : (
        ''
      )}
      {stepCompoments > 1 && booking.renovated === true ? (
        <>
          <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
            Année de rénovation
          </p>

          <input
            id="dateBuild"
            name="yearsRenovated"
            type="number"
            maxLength="4"
            value={booking.yearsRenovated}
            onChange={handleInput}
            className="inline-flex border px-8 py-4 rounded text-center w-full focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97]"
          />
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
                  <label>{counter.placeHolder}</label>
                  <div className="rounded inline-flex">
                    <button
                      className="border   px-8 py-4 rounded-l"
                      name={counter.name}
                      id={counter.id}
                      onClick={decreaseCounterAppart}
                    >
                      -
                    </button>
                    <input
                      type="tel"
                      id="house"
                      name="house"
                      value={counter.value}
                      className="inline-flex border px-8 py-4  text-center w-full"
                    />

                    <button
                      className="border   px-8 py-4 rounded-r"
                      name={counter.name}
                      id={counter.id}
                      onClick={increaseCounterAppart}
                    >
                      +
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        ''
      )}

      <button
        className="px-8 py-4 bg-[#075b97] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={nextStepper}
        disabled={disabled}
      >
        Continuer{' '}
      </button>
    </div>
  );
};

export default SurfaceSelect;
