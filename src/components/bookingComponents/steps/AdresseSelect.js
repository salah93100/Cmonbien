import React from 'react'
import { GoogleMap, useJsApiLoader, Marker ,Autocomplete,StandaloneSearchBox  } from '@react-google-maps/api';
import { SkeletonText } from '@chakra-ui/react'
import { useState,useRef,useEffect} from 'react';
import {Formatrelative} from 'date-fns';
import { getGeocode, getLatLng } from "use-places-autocomplete";



const AdresseSelect=({setBooking,booking,setNextStep,nextStep}) =>{
  useEffect(() => {
    if (booking.adress.length>0) {
      setNextStep(false);
    }

  },[booking])
  const center={
    lat: 48.866667,
    lng: 4.333333
  };
  const Adress=useRef()
  const [map, setMap] = useState(null);
 const [markerLocation, setMarkerLocation] = useState({
  lat: 48.866667,
  lng: 4.333333
});
  const [searchResults, setSearchResults] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyASR02wYWLes8p-B27bU0234O1EU6k9L_E",
    libraries: ['places']
  })
 

  function onLoad(autocomplete) {
    setSearchResults(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResults != null) {
      const place = searchResults.getPlace();
  
      const formattedAddress = {
        address: place.formatted_address,
      };
      setBooking({...booking,adress:formattedAddress.address})
      // console.log(place);
      console.log(`Formatted Address: ${formattedAddress.address}`);
      getGeocode(formattedAddress).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("Coordinates: ", { lat, lng });
        setMarkerLocation({lat:lat,lng:lng})
      });
      
    } else {
      alert("Please enter text");
    }
  }
if (!isLoaded){
  return <SkeletonText/>
}
  return (
    <div className='space-y-6 w-full '>
      <p className="px-8 py-4 bg-slate-400">C'est parti! Cela ne devrait pas vous prendre plus de 4 minutes...</p>
      <p className="px-8 py-4 bg-slate-400">Nous sommes prêts à évaluer votre bien.</p>

     {console.log(searchResults)}
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
      <input type="text" name="adress"  placeholder='Adresse...' className='border-1 px-4 py-3  border border-slate-600  w-full' />
      </Autocomplete >
      <GoogleMap
       mapContainerStyle={{
        width: '400px',
        height: '400px'
      }}
       center={markerLocation}
       zoom={12}
       options={{
        zoomControl:false,
        fullscreenControl:false,
        mapTypeControl:false,
        streetViewControl:false
        }
       }
       
       onLoad={map=>setMap(map)}
      >
        
       <Marker position={markerLocation}/>
      
      </GoogleMap>
    </div>
  )
}

export default AdresseSelect
