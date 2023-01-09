import React from "react";
import { useState } from "react";

const SurfaceSelect=({children,booking,setBooking})=>{
    const [counterSuface, setCounterSuface] = useState({
        Surface:0,
        SurfaceBalcon:0,
        SurTerrain:0
        
    });

    const increaseCounterAppart = (e) => {
        const { id, name } = e.target;
       
        if (id === "Surface") {
           
                setCounterSuface({ ...counterSuface,Surface:counterSuface.Surface +1 });}

        else if (id === "SurfaceBalcon") {
          
                setCounterSuface({ ...counterSuface,SurfaceBalcon:counterSuface.SurfaceBalcon +1 });
        }else {
           console.log("rrrrr")
                setCounterSuface({
            ...counterSuface,
            SurTerrain: counterSuface.SurTerrain +1,
          });
        }
      };

      const decreaseCounterAppart = (e) => {
        const { id, name } = e.target;
        if (id === "Surface") {
            if(counterSuface.Surface>0){
                setCounterSuface({ ...counterSuface,Surface:counterSuface.Surface -1 });}
        } 
        else if (id === "SurfaceBalcon") {
            if(counterSuface.SurfaceBalcon>0){
                setCounterSuface({ ...counterSuface,SurfaceBalcon:counterSuface.SurfaceBalcon - 1 });}
        }else {
            if(counterSuface.SurTerrain>0){
                setCounterSuface({
            ...counterSuface,
            SurTerrain: counterSuface.SurTerrain -1,
          });}
        }
      };

      const handleInput=(e)=>{
         const {name,value}=e.target
         setBooking({...booking,[name]:value})
      }
    return(
<div className="space-y-6">
<p className="px-8 py-4 bg-slate-400">Super! Nous sommes presque prêts à évaluer votre maison

</p>
 <p className="px-8 py-4 bg-slate-400">Êtes-vous le propriétaire de ce bien?</p>
 <p className="px-8 py-4 bg-slate-400">Message numero 3</p>

 <div className="w-full inline-flex flex-col">
<label>Surface (Carrez) m²</label>
<div className="rounded inline-flex">
    <button className="border   px-8 py-4 rounded" id="Surface" onClick={decreaseCounterAppart}>-</button>
    <input type="tel" id="house" name="house" value={counterSuface.Surface}className="inline-flex border px-8 py-4 rounded text-center w-full" />
    
    <button className="border   px-8 py-4 rounded" id="Surface" onClick={increaseCounterAppart}>+</button>
</div>
</div>

<div className="w-full inline-flex flex-col">
<label>Surface des balcons m²</label>
<div className="rounded inline-flex">
    <button className="border   px-8 py-4 rounded" id="SurfaceBalcon" onClick={decreaseCounterAppart}>-</button>
    <input type="tel" id="house" name="house" value={counterSuface.SurfaceBalcon}className="inline-flex border px-8 py-4 rounded text-center w-full" />
    
    <button className="border   px-8 py-4 rounded" id="SurfaceBalcon"  onClick={increaseCounterAppart}>+</button>
</div>
</div>

<div className="w-full inline-flex flex-col">
<label>Surface du terrain</label>
<div className="rounded inline-flex">
    <button className="border   px-8 py-4 rounded" id="SurTerrain" onClick={decreaseCounterAppart}>-</button>
    <input type="tel" id="house" name="house" value={counterSuface.SurTerrain }className="inline-flex border px-8 py-4 rounded text-center w-full" />
    
    <button className="border   px-8 py-4 rounded" id="SurTerrain" onClick={increaseCounterAppart}>+</button>
</div>
</div>
<p className="px-8 py-4 bg-slate-400">Quelle est l'année de construction de la maison?</p>
<input id="dateBuild" name="yearsBuild" type="number" min="1900" max="2022" step="1" value="1900" className="inline-flex border px-8 py-4 rounded text-center w-full" />

<p className="px-8 py-4 bg-slate-400">Votre bien a il était rénnové</p>
<div className="flex flex-col gap-3">
<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Maison individuelle
</label>

<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Maison individuelle
</label>
</div>
<p className="px-8 py-4 bg-slate-400">Année de rénovation (Si bien rénové) </p>

<input id="dateBuild" name="yearsBuild" type="number" min="1900" max="2022" step="1" maxLength={4} value={booking.yearsBuild} onChange={handleInput} className="inline-flex border px-8 py-4 rounded text-center w-full" />

<div className="w-full inline-flex flex-col">
<label>Nombre de pièces Appartement</label>
<div className="rounded inline-flex">
    <button className="border   px-8 py-4 rounded">-</button>
    <input type="tel" id="house" name="house" value={0}className="inline-flex border px-8 py-4 rounded text-center w-full" />
    
    <button className="border   px-8 py-4 rounded">+</button>
</div>
</div>

</div>
    )
}

export default SurfaceSelect