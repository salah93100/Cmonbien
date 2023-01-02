import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { SkeletonText } from '@chakra-ui/react'

const center={
  lat: 48.866667,
  lng: 2.333333
};
export default function AdresseSelect() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCRnA2flLAHgYqXL6LtlNKghycFF_74B6o"
  })
if (!isLoaded){
  return <SkeletonText/>
}
  return (
    <div className='space-y-6 w-full '>
      <input type="text" name="adress" placeholder='Adresse...' className='border-1 px-4 py-3  border border-slate-600  w-full'/>
      <GoogleMap
       mapContainerStyle={{
        width: '435px',
        height: '400px'
      }}
       center={center}
       zoom={10}
      ></GoogleMap>
    </div>
  )
}
