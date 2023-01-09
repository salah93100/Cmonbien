import React from "react";
import { useState,useEffect } from "react";

const HouseSelect=({children,booking,setBooking,setNextStep})=>{

    
const [selected, setSelected] = useState(false);

const handleClick = (e) => {
    const {id,value}=e.target
    setSelected(id);
    setBooking({...booking,houseOptions:value})
    console.log(value)
  }
    return(
<div className="space-y-6">
    <p>Type de bien</p>
    <div className="flex flex-col gap-3">
<button type="button" id="house" name="house" value="House" className={`border w-full text-left  px-8 py-4 rounded ${selected==='house'?"border-blue-700":""}`} onClick={handleClick}>Maison</button>

<button type="button" id="appart" name="appart" value="Appartement" className={`border w-full text-left  px-8 py-4 rounded ${selected==='appart'?"border-blue-700":""}`} onClick={handleClick}>Appartement</button>
</div>
</div>
    )
}

export default HouseSelect