import React from "react";


const SaleSelect=({children})=>{
    return(
<div className="space-y-6">
<p className="px-8 py-4 bg-slate-400">Souhaitez-vous vendre votre l'appartement ?</p>

    <div className="flex flex-col gap-3">
    <label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Oui, dès que possible
</label>
<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Oui, dans 6 à 12 mois
</label>
<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Oui, dans 1 à 2 ans
</label>
<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Oui, dans 2 ans et plus
</label>
<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Le bien est déjà en vente
</label>
<label className="border w-full text-left  px-8 py-4 rounded">
<input type="radio" id="house" name="house" value="Maison" className="mr-2"/>


Non, je ne souhaite pas vendre
</label>
</div>
</div>
    )
}

export default SaleSelect