import React from "react";
import { useState,useEffect } from "react";

const DetailsHouse = ({ children, booking, setBooking }) => {
  const radioArray = [
    {
      id: 0,
      name: "houseType",
      value: "Individual House",
      type: "House",
      placeHolder: "Maison individuel",
    },
    {
      id: 1,
      name: "houseType",
      value: "Group House",
      type: "House",
      placeHolder: "Maison Groupé",
    },
    {
      id: 2,
      name: "houseType",
      value: "Appartement",
      type: "Appartement",
      placeHolder: "Appartement",
    },
    {
      id: 3,
      name: "houseType",
      value: "DuplexAtique",
      type: "Appartement",
      placeHolder: "Duplex en attique (Appartement Duplex sur Toit Terrasse)",
    },
    {
      id: 4,
      name: "houseType",
      value: "Atique",
      type: "Appartement",
      placeHolder: "Attique (Appartement toit terrasse)",
    },
  ];
  const CheckExtraArray = [
    {
      id: 0,
      name: "Vue dégagée",
      value: "Individual House",
      type: "All",
      placeHolder: "Vue dégagée",
    }, {
        id:1 ,
        name: "Piscine",
        value: "Individual House",
        type: "House",
        placeHolder: "Piscine",
      }, {
        id: 2,
        name: "Jardin",
        value: "Individual House",
        type: "Appartement",
        placeHolder: "Jardin",
      }
      , {
        id: 3,
        name: "Ascenseur",
        value: "Individual House",
        type: "Appartement",
        placeHolder: "Ascenseur",
      }
     
  ];
  
  
  const [checked, setChecked] = useState(0);
  const [checkedExtra, setCheckedExtra] = useState(0);
  const [stageApart, setStageApart] = useState({
    stageHouse: 0,
    stageBuilding: 0,
  });
  useEffect(()=>{
   setBooking({...booking,stageApart:stageApart})
  },[stageApart])


  const handleInputChange = (e) => {
    const { id, name ,type} = e.target;
    {console.log(e.target.checked)}
  const value = type==="checkbox"?e.target.checked:e.target.value
   if(type==="checkbox"){
    setCheckedExtra(parseInt(id))
    setBooking({ ...booking, [name]: value });

   }
   else{
    setChecked(parseInt(id));
    setBooking({ ...booking, [name]: value });
}
  };

  const increaseCounterAppart = (e) => {
    const { id, value } = e.target;
    if (id === "Building") {
      setStageApart({ ...stageApart, stageHouse: stageApart.stageHouse + 1 });
    } else {
      setStageApart({
        ...stageApart,
        stageBuilding: stageApart.stageBuilding + 1,
      });
    }
  };
  const decreaseCounterAppart = (e) => {
    const { id, value } = e.target;
    if (id === "Building") {
        if(stageApart.stageHouse>0){
      setStageApart({ ...stageApart, stageHouse: stageApart.stageHouse - 1 });}
    } else {
        if(stageApart.stageBuilding>0){
      setStageApart({
        ...stageApart,
        stageBuilding: stageApart.stageBuilding -1,
      });}
    }
  };

  return (
    <div className="space-y-6">
      {console.log(stageApart)}
      <p class="show-element">
        Type {booking.houseOptions === "House" ? "de Maison" : "d'Appartement"}
      </p>

      <div className="flex flex-col gap-3">
        {radioArray.map((radio) => {
          return (
            radio.type === booking.houseOptions && (
              <label className="border w-full text-left  px-8 py-4 rounded">
                <input
                  type="radio"
                  id={radio.id}
                  name={radio.name}
                  value={radio.value}
                  className="mr-2 checked:bg-blue-500 "
                  onChange={handleInputChange}
                  checked={checked === radio.id}
                />

                {checked === radio.id}
                {radio.placeHolder}
              </label>
            )
          );
        })}

        <div className="w-full inline-flex flex-col">
          {booking.houseOptions === "Appartement" ? (
            <>
              <p className="px-8 py-4 bg-slate-400 ">
                A quel étage se trouve l'appartement ?
              </p>

              <label>Nombre d’étages de l’Appartement</label>
              <div className="rounded inline-flex">
                <button 
                className="border   px-8 py-4 rounded"
                onClick={decreaseCounterAppart}
                >-
                </button>
                <input
                  type="tel"
                  id="house"
                  name="house"
                  value={stageApart.stageBuilding}
                  className="inline-flex border px-8 py-4 rounded text-center w-full"
                />

                <button
                  className="border   px-8 py-4 rounded"
                  id="Appart"
                  onClick={increaseCounterAppart}
                >
                  +
                </button>
              </div>
              <label>Nombre d’étages de l’immeuble</label>
              <div className="rounded inline-flex">
                <button 
                className="border   px-8 py-4 rounded" 
                id="Building"
                onClick={decreaseCounterAppart}
                >
                  -
                </button>
                <input
                  type="tel"
                  id="house"
                  name="house"
                  value={stageApart.stageHouse}
                  className="inline-flex border px-8 py-4 rounded text-center w-full"
                />

                <button
                  className="border   px-8 py-4 rounded"
                  id="Building"
                  onClick={increaseCounterAppart}
                >
                  +
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        {CheckExtraArray.map((extra)=>{
        return    ( extra.type === booking.houseOptions ||  extra.type === "All")&&
            (
            <label className="border w-full text-left  px-8 py-4 rounded">
            <input
              type="checkbox"
              id={extra.id}
              name={extra.name}
              value={extra.value}
              className="mr-2"
              onChange={handleInputChange}
            />
           {extra.placeHolder}
          </label>)
        })}

      
        <p className="px-8 py-4 bg-slate-400">
          Super! Nous sommes presque prêts à évaluer votre maison
        </p>
        <p className="px-8 py-4 bg-slate-400">
          Êtes-vous le propriétaire de ce bien?
        </p>

        <label className="border w-full text-left  px-8 py-4 rounded">
          <input
            type="radio"
            id="house"
            name="owner"
            value="Propriétaire"
            className="mr-2"
            onChange={handleInputChange}
          />
          Propriétaire
        </label>
        <label className="border w-full text-left  px-8 py-4 rounded">
          <input
            type="radio"
            id="house"
            name="owner"
            value="Locataire"
            className="mr-2"
            onChange={handleInputChange}

          />
          Locataire
        </label>
      </div>
    </div>
  );
};

export default DetailsHouse;
