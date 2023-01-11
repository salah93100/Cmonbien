import React from "react";
import { useState } from "react";

const VerificationSelect=({children,booking,setBooking})=>{
    const [validState, setValidState] = useState({});
    const handleChangeInput=(e)=>{
        const {name,value}=e.target
        setValidState({...validState,[name]:value})
     }
    return(
<div className="space-y-6">
<h1 className="text-4xl text-center">Verification</h1>
{console.log(validState)}
    <div className="flex flex-col gap-3">
      
    <input type="text" name="email"  placeholder='Email' onChange={handleChangeInput} value={validState.email} className='inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97]' />
    <input type="text" name="firstName"  placeholder='Prénom' onChange={handleChangeInput} value={validState.firstName} className='inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97]' />
    <input type="text" name="lastName"  placeholder='Nom de famille' onChange={handleChangeInput} value={validState.lastName} className='inline-flex border px-4 py-4 rounded  w-full focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97]' />

    </div>
</div>
    )
}

export default VerificationSelect