import React from "react";


const SurfaceSelect=({children})=>{
    return(
<div className="space-y-6 overflow-y-scroll">
<p className="px-8 py-4 bg-slate-400">Super! Nous sommes presque prêts à évaluer votre maison

</p>
 <p className="px-8 py-4 bg-slate-400">Êtes-vous le propriétaire de ce bien?</p>
 <p className="px-8 py-4 bg-slate-400">Message numero 3</p>

 <div className="w-full inline-flex flex-col">
<label>Surface (Carrez) m²</label>
<div className="rounded inline-flex">
    <button className="border   px-8 py-4 rounded">-</button>
    <input type="tel" id="house" name="house" value={0}className="inline-flex border px-8 py-4 rounded text-center w-full" />
    
    <button className="border   px-8 py-4 rounded">+</button>
</div>
</div>

<div className="w-full inline-flex flex-col">
<label>Surface des balcons m²</label>
<div className="rounded inline-flex">
    <button className="border   px-8 py-4 rounded">-</button>
    <input type="tel" id="house" name="house" value={0}className="inline-flex border px-8 py-4 rounded text-center w-full" />
    
    <button className="border   px-8 py-4 rounded">+</button>
</div>
</div>

<div className="w-full inline-flex flex-col">
<label>Surface du terrain</label>
<div className="rounded inline-flex">
    <button className="border   px-8 py-4 rounded">-</button>
    <input type="tel" id="house" name="house" value={0}className="inline-flex border px-8 py-4 rounded text-center w-full" />
    
    <button className="border   px-8 py-4 rounded">+</button>
</div>
</div>
<p className="px-8 py-4 bg-slate-400">Quelle est l'année de construction de la maison?</p>
<input id="dateBuild" name="datebuild" type="number" min="1900" max="2022" step="1" value="1900" className="inline-flex border px-8 py-4 rounded text-center w-full" />

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

<input id="dateBuild" name="datebuild" type="number" min="1900" max="2022" step="1" value="1900" className="inline-flex border px-8 py-4 rounded text-center w-full" />

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