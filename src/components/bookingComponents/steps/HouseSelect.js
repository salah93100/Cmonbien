import React from "react";
import { useState,useEffect } from "react";
import { MdHouse } from 'react-icons/md'
import { FaBuilding } from 'react-icons/fa'


import { Icon } from '@chakra-ui/react'


const HouseSelect=({children,booking,setBooking,setNextStep})=>{

    
const [selected, setSelected] = useState(false);

const handleClick = (e) => {
    const {id,value}=e.target
    setSelected(id);
    setBooking({...booking,houseOptions:value})
    console.log(value)
  }
  useEffect(() => {
    if (booking.houseOptions.length>0) {
      setNextStep(false);
    }

  },[booking])
    return(

<div className="space-y-6">
    <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none ">Quel type de bien souhaitez-vous évaluer ?</p>
    <div className="flex flex-col gap-3">
<button type="button" id="house" name="house" value="House" className={`border gap-2 w-full text-left  px-8 py-4 rounded items-center flex ${selected==='house'?"border-[#075b97]":""}`} onClick={handleClick}><Icon as={MdHouse} w={6} h={6} />Maison</button>

<button type="button" id="appart" name="appart" value="Appartement" className={`border gap-2 w-full text-left  px-8 py-4 rounded items-center  flex ${selected==='appart'?"border-[#075b97]":""}`} onClick={handleClick}><Icon as={FaBuilding}  w={6} h={6}  />Appartement</button>
</div>
</div>
    )
}

export default HouseSelect
