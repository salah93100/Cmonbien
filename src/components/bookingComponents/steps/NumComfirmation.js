import { useState } from "react"

const NumComfirmation=({children,booking,setBooking,register,errors})=>{
  const [numTel, setNumTel] = useState("")
    return(
        <div className="space-y-6 gap-2">
       <div className="text-center gap-2">
        <p className="text-3xl">Numéro comfirmation</p>
       <input type="tel" value={numTel} className="border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97] w-full rounded" placeholder="XXXXXXX"/></div>
        </div>
    )
}


export default NumComfirmation