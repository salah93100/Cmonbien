import React from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import { SkeletonText, Stack, Skeleton } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { Formatrelative, isValid } from 'date-fns';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { motion } from "framer-motion"


const AdresseSelect = ({ setBooking, booking, setNextStep, nextStep,register,errors }) => {
  useEffect(() => {
    if (booking.adress.length > 0) {
      setNextStep(false);
    }
  }, [booking]);

  const [map, setMap] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyASR02wYWLes8p-B27bU0234O1EU6k9L_E',
    libraries: ['places'],
  });

  function onLoad(autocomplete) {
    setSearchResults(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResults != null) {
      const place = searchResults.getPlace();

      const formattedAddress = {
        address: place.formatted_address,
      };
      setBooking({ ...booking, adress: formattedAddress.address });

      getGeocode(formattedAddress).then(results => {
        const { lat, lng } = getLatLng(results[0]);
        setMarkerLocation({ lat: lat, lng: lng });
      });
    } else {
      alert('Please enter text');
    }
  }
  if (!isLoaded) {
    return (
      <Stack>
        <Skeleton height="64px" />
        <Skeleton height="64px" />
        <Skeleton height="32px " />
        <Skeleton height="350px " />
      </Stack>
    );
  }
  return (
    <div className="space-y-6 w-full ">
         <motion.div
    initial={{y:100}} 
    transition={{duration:0.3}}
     whileInView={{y:0}}
    >
      <p className="px-8 py-4 bg-[#005c7c] rounded-md rounded-bl-none text-white">
        C'est parti! Cela ne devrait pas vous prendre plus de <span className="font-bold">4 minutes</span>...
      </p>
      </motion.div>
      <motion.div
    initial={{y:100}} 
    transition={{duration:0.6}}
     whileInView={{y:0}}
    >
      <p className="px-8 py-4 bg-[#005c7c] rounded-md rounded-bl-none text-white">
        Nous sommes prêts à évaluer votre bien.
      </p>
      </motion.div>
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        types={['address']}
        restrictions={{ country: ['fr'],  }}
      >
        <input
          type="text"
          name="adress"
          {...register(
            'adress',
            { required: 'Veuillez entrez votre adresse' },
            { pattern: /^[A-Za-z]+$/i }
          )}
          placeholder="Adresse..."
          className="border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#005c7c] focus:ring-[#005c7c] w-full rounded"
        />
      </Autocomplete>
      {errors.adress && (
          <p className="text-red-400">{errors.adress.message}</p>
        )}
      <GoogleMap
        mapContainerStyle={{
            width: '100%',
            height: '300px',
            borderRadius: '4px',
            borderColor: '#005c7c',
            borderWidth: '2px',
        }}
        center={markerLocation ? markerLocation : {
            lat: 46.8,
            lng: 2.2,
        }}
        zoom={markerLocation ? 18 : 5}
        options={{
          zoomControl: true,
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
        onLoad={map => setMap(map)}
      >
          {markerLocation ? <Marker position={markerLocation} /> : '' }
      </GoogleMap>
    </div>
  );
};

export default AdresseSelect;
