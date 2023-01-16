import { useState } from "react"

const NumComfirmation=({children,booking,setBooking,register,errors,setStep})=>{
  const [numTel, setNumTel] = useState("")
  const [open, setOpen] = useState(false)

    return(
        <div className="space-y-6 ">
       <div className="text-center  space-6 ">
        <p className="text-4xl my-5">Numéro de Vérification</p>
       <input type="tel" value={numTel} className="flex border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97] w-full rounded" placeholder="XX XX XX XX XX" onChange={(e)=>{setNumTel(e.target.value)}}/></div>
       <button className='px-8 py-4 bg-[#075b97] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed' onClick={()=>{setOpen(true)}} >Envoyer Le code de Vérification</button>
     {open?
      (<><input type="tel" value={numTel} className="flex border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97] w-full rounded" placeholder="_ _ _ _" onChange={"(e)=>setNumTel(e.target.value)"}/>
       <button className='px-8 py-4 bg-[#075b97] text-white rounded w-full disabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed' onClick={()=>{setStep(prev=>prev+1)}}>Je veux recevoir mon estimation, cliquez ici!</button> </>):("")}

        </div>
    )
}


export default NumComfirmation