import React from 'react';
import { useState, useEffect } from 'react';

const DetailsHouse = ({ children, booking, setBooking, setStep }) => {
  const radioArray = [
    {
      id: 0,
      name: 'houseType',
      value: 'Individual House',
      type: 'House',
      placeHolder: 'Maison individuel',
    },
    {
      id: 1,
      name: 'houseType',
      value: 'Group House',
      type: 'House',
      placeHolder: 'Maison Groupé',
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
  const [disabled, setDisabled] = useState(true);

  const [stageApart, setStageApart] = useState({
    stageHouse: 0,
    stageBuilding: 0,
  });
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
      setDisabled(true);
    }
    if (stepCompoments === 2) {
      console.log('SetnextStep');
      setStep(prev => prev + 1);
    } else {
      setStepCompoments(prev => prev + 1);
    }
  };
  const handleInputChange = e => {
    setDisabled(false);
    const { id, name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    if (type === 'checkbox') {
      setCheckedExtra(parseInt(id));
      setBooking({ ...booking, [name]: value });
    } else {
      setChecked(parseInt(id));
      setBooking({ ...booking, [name]: value });
    }
  };

  const increaseCounterAppart = e => {
    const { id, value } = e.target;
    if (id === 'Building') {
      setStageApart({ ...stageApart, stageHouse: stageApart.stageHouse + 1 });
    } else {
      setStageApart({
        ...stageApart,
        stageBuilding: stageApart.stageBuilding + 1,
      });
    }
    setDisabled(false);
  };
  const decreaseCounterAppart = e => {
    const { id, value } = e.target;
    if (id === 'Building') {
      if (stageApart.stageHouse > 0) {
        setStageApart({ ...stageApart, stageHouse: stageApart.stageHouse - 1 });
      }
    } else {
      if (stageApart.stageBuilding > 0) {
        setStageApart({
          ...stageApart,
          stageBuilding: stageApart.stageBuilding - 1,
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {console.log(stepCompoments)}
      <p class="px-8 py-4 bg-[#f05623]  rounded-md rounded-bl-none text-white">
        Type {booking.houseOptions === 'House' ? 'de Maison' : "d'Appartement"}
      </p>

      <div className="flex flex-col gap-3">
        {radioArray.map(radio => {
          return (
            radio.type === booking.houseOptions && (
              <label
                className={`border w-full text-left  px-8 py-4 rounded ${
                  booking.houseType === radio.value ? 'border-[#f05623]' : ''
                } `}
              >
                <input
                  type="radio"
                  id={radio.id}
                  name={radio.name}
                  value={radio.value}
                  className="mr-2 checked:bg-blue-500 "
                  onChange={handleInputChange}
                  checked={booking.houseType === radio.value}
                />

                {checked === radio.id}
                {radio.placeHolder}
              </label>
            )
          );
        })}

        <div className="w-full inline-flex flex-col">
          {booking.houseOptions === 'Appartement' &&
          booking.houseType.length > 0 ? (
            <>
              <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
                A quel étage se trouve l'appartement ?
              </p>

              <label>Nombre d’étages de l’Appartement</label>
              <div className="rounded-l inline-flex">
                <button
                  className="border px-8 py-4 rounded-l"
                  onClick={decreaseCounterAppart}
                >
                  -
                </button>
                <input
                  type="tel"
                  id="house"
                  name="house"
                  value={stageApart.stageBuilding}
                  className="inline-flex border px-8 py-4 outline-none text-center w-full"
                />

                <button
                  className="border   px-8 py-4 rounded-r"
                  id="Appart"
                  onClick={increaseCounterAppart}
                >
                  +
                </button>
              </div>
              <label>Nombre d’étages de l’immeuble</label>
              <div className="rounded inline-flex">
                <button
                  className="border   px-8 py-4 rounded-l"
                  id="Building"
                  onClick={decreaseCounterAppart}
                >
                  -
                </button>
                <input
                  type="tel"
                  id="house"
                  name="house"
                  value={stageApart.stageHouse}
                  className="inline-flex border px-8 py-4  text-center w-full outline-none"
                />

                <button
                  className="border   px-8 py-4 rounded-r"
                  id="Building"
                  onClick={increaseCounterAppart}
                >
                  +
                </button>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        {CheckExtraArray.map(extra => {
          return (
            (extra.type === booking.houseOptions || extra.type === 'All') &&
            stepCompoments > 0 && (
              <label
                className={`border w-full text-left  px-8 py-4 rounded ${
                  booking[extra.name] === true ? 'border-[#f05623]' : ''
                }`}
              >
                <input
                  type="checkbox"
                  id={extra.id}
                  name={extra.name}
                  value={extra.value}
                  className="mr-2"
                  onChange={handleInputChange}
                  checked={booking[extra.name] === true}
                />
                {extra.placeHolder}
              </label>
            )
          );
        })}

        {stepCompoments > 1 ? (
          <>
            <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
              Super! Nous sommes presque prêts à évaluer votre maison
            </p>
            <p className="px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none">
              Êtes-vous le propriétaire de ce bien?
            </p>

            <label
              className={`border w-full text-left  px-8 py-4 rounded  ${
                booking.owner === 'Propriétaire' ? 'border-[#f05623]' : ''
              }`}
            >
              <input
                type="radio"
                id="house"
                name="owner"
                value="Propriétaire"
                className="mr-2"
                onChange={handleInputChange}
                checked={booking.owner === 'Propriétaire'}
              />
              Propriétaire
            </label>
            <label
              className={`border w-full text-left  px-8 py-4 rounded  ${
                booking.owner === 'Locataire' ? 'border-[#f05623]' : ''
              }`}
            >
              <input
                type="radio"
                id="house"
                name="owner"
                value="Locataire"
                className="mr-2"
                onChange={handleInputChange}
                checked={booking.owner === 'Locataire'}
              />
              Locataire
            </label>
          </>
        ) : (
          ''
        )}
      </div>
      <button
        className="px-8 py-4 bg-[#f05623] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={nextStepper}
        disabled={disabled}
      >
        Continuer{' '}
      </button>
    </div>
  );
};

export default DetailsHouse;
