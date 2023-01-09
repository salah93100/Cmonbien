import React from "react";


const VerificationSelect=({children})=>{
    return(
<div className="space-y-6">
<p className="px-8 py-4 bg-slate-400">Souhaitez-vous vendre votre l'appartement ?</p>

    <div className="flex flex-col gap-3">
        <label>Email</label>
    <input type="text" name="adress"  placeholder='Email' className='border-1 px-4 py-3  border border-slate-600  w-full' />
    <input type="text" name="adress"  placeholder='Prénom' className='border-1 px-4 py-3  border border-slate-600  w-full' />
    <input type="text" name="adress"  placeholder='Nom de famille' className='border-1 px-4 py-3  border border-slate-600  w-full' />

    </div>
</div>
    )
}

export default VerificationSelect