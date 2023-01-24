import React from 'react';
import { useState, useEffect } from 'react';
import { MdHouse } from 'react-icons/md';
import { FaBuilding } from 'react-icons/fa';

import { Icon } from '@chakra-ui/react';

const HouseSelect = ({ children, booking, setBooking, setNextStep ,register,errors,watch}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = e => {
    const { id, value } = e.target;
    setSelected(id);
    setBooking({ ...booking, houseOptions: value });

  };
  useEffect(() => {
    if (watch('houseOptions')) {
      setNextStep(false);
    }
  }, [watch('houseOptions')]);
  return (
    <div className="space-y-6">
      <p className={`px-8 py-4 bg-[#f05623] text-white rounded-md rounded-bl-none`}>
        Quel type de bien souhaitez-vous évaluer ?
      </p>
      <div className="flex flex-col gap-3">
        <label className={`border w-full text-left  px-8 py-4 rounded ${watch('houseOptions')==="House"?'border-[#075b97] ':''}`}>
      
        <input
          type="radio"
          {...register(
            'houseOptions',  
            { required: 'choisir type' },
          )}
          id="house"
          value="House"
          className={`mr-2 `}
          onClick={handleClick}
          />
            <Icon as={MdHouse} w={6} h={6} />
          Maison
          </label>
          
        
       
        <label className={`border w-full text-left  px-8 py-4 rounded ${watch('houseOptions')==="Appartement"?'border-[#075b97] ':''}`}>
      
        <input
          type="radio"
          id="appart"
          {...register(
            'houseOptions',  
            { required: 'choisir type' },
          )}
          value="Appartement"
          className={`mr-2 checked:bg-blue-500${
            selected === 'appart' ? 'border-[#f05623]' : ''
          }`}
          onClick={handleClick}
          />
          <Icon as={FaBuilding} w={6} h={6} />
          Appartement
          </label>
      </div>
    </div>
  );
};

export default HouseSelect;
