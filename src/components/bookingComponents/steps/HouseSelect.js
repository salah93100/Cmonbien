import React from 'react';

const HouseSelect = ({ children }) => {
  return (
    <div>
      <input type="radio" id="house" name="house" value="Maison" />
      Maison
      <input type="radio" id="appart" name="appart" value="Appartement" />
    </div>
  );
};

export default HouseSelect;
