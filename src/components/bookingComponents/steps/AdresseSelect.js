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
import { Formatrelative } from 'date-fns';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

const AdresseSelect = ({ setBooking, booking, setNextStep, nextStep }) => {
  useEffect(() => {
    if (booking.adress.length > 0) {
      setNextStep(false);
    }
  }, [booking]);

  const [map, setMap] = useState(null);
  const [markerLocation, setMarkerLocation] = useState({
    lat: 48.866667,
    lng: 4.333333,
  });
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
      // console.log(place);
      console.log(`Formatted Address: ${formattedAddress.address}`);
      getGeocode(formattedAddress).then(results => {
        const { lat, lng } = getLatLng(results[0]);
        console.log('Coordinates: ', { lat, lng });
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
      <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
        C'est parti! Cela ne devrait pas vous prendre plus de 4 minutes...
      </p>
      <p className="px-8 py-4 bg-[#075b9725]  rounded-md rounded-bl-none">
        Nous sommes prêts à évaluer votre bien.
      </p>

      {console.log(searchResults)}
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        restrictions={{ country: ['fr'] }}
      >
        <input
          type="text"
          name="adress"
          placeholder="Adresse..."
          className="border px-8 py-4 focus:outline-none focus:ring-1 focus:border-[#075b97] focus:ring-[#075b97] w-full rounded"
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '300px',
          borderradius: '4px',
        }}
        center={markerLocation}
        zoom={12}
        options={{
          zoomControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
        onLoad={map => setMap(map)}
      >
        <Marker position={markerLocation} />
      </GoogleMap>
    </div>
  );
};

export default AdresseSelect;
