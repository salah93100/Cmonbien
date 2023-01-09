import React from "react";
import { useState } from "react";

const DetailsHouse=({children,booking,setBooking})=>{
    const radioArray=[
        {id:0,name:"houseIndividual",value:"Individual House",type:"House",placeHolder:"Maison individuel"},
        {id:1,name:"houseGroup",value:"Group House",type:"House",placeHolder:"Maison Groupé"},
        {id:2,name:"Appartement",value:"Appartement",type:"Appartement",placeHolder:"Appartement"},
        {id:3,name:"DuplexAtique",value:"DuplexAtique",type:"Appartement",placeHolder:"Duplex en attique (Appartement Duplex sur Toit Terrasse)"},
        {id:4,name:"Atique",value:"Atique",type:"Appartement",placeHolder:"Attique (Appartement toit terrasse)"},
        ]
     const [checked, setChecked] = useState(5);   
        const handleInputChange=(e)=>{
          const {value,id,checked} = e.target
   console.log(id)
   setChecked(id)
        }
    return(
<div className="space-y-6">
<p class="show-element">Type {booking.houseOptions==="House"?"de Maison":"d'Appartement"}</p>

<div className="flex flex-col gap-3">
    {radioArray.map((radio)=>{
     return    radio.type===booking.houseOptions
        &&     (

<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id={radio.id} name={radio.name} value={radio.value} className="mr-2 checked:bg-blue-500 " onChange={handleInputChange} checked={checked===radio.id}/>


{radio.placeHolder}
</label>
)
    })}

<div className="w-full inline-flex flex-col">
    {booking.houseOptions==="Appartement"?(
        <>
        <label>Nombre d’étages de l’immeuble</label>
<div className="rounded inline-flex">
    <button className="border   px-8 py-4 rounded">-</button>
    <input type="tel" id="house" name="house" value={0}className="inline-flex border px-8 py-4 rounded text-center w-full" />
    
    <button className="border   px-8 py-4 rounded">+</button>
</div>
</>
    ):("")}

</div>



<label className="border w-full text-left  px-8 py-4 rounded">
    {console.log(booking.houseOption==="Appartement")}
<input type="checkbox" id="house" name="house" value="Maison" className="mr-2"/>


Vue degagé
</label>

<label className="border w-full text-left  px-8 py-4 rounded">
<input type="checkbox" id="house" name="house" value="Maison" className="mr-2"/>


Piscine
</label>
<p className="px-8 py-4 bg-slate-400">Super! Nous sommes presque prêts à évaluer votre maison

</p>
 <p className="px-8 py-4 bg-slate-400">Êtes-vous le propriétaire de ce bien?</p>

 <label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Propriétaire
</label>
<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Locataire
</label>
</div>
</div>
    )
}

export default DetailsHouse