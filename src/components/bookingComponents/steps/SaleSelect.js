import { React, useEffect } from 'react';

const SaleSelect = ({
  children,
  booking,
  setBooking,
  nextStep,
  setNextStep,
  register,
  watch,
  isValid
}) => {
  const ArraySales = [
    { id: 0, value: 'Oui, dès que possible' },
    { id: 1, value: 'Oui, dans 6 à 12 mois' },
    { id: 2, value: 'Oui, dans 1 à 2 ans' },
    { id: 3, value: 'Oui, dans 2 ans et plus' },
    { id: 4, value: 'Le bien est déjà en vente' },
    { id: 5, value: 'Non, je ne souhaite pas vendre' },
  ];

  const handleInput = e => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  useEffect(() => {
    if (!isValid) {
      setNextStep(false);
    }
  }, [isValid]);

  return (
    <div className="space-y-6">
      <p className="px-8 py-4 bg-[#f0562325] rounded-md rounded-bl-none">
        Souhaitez-vous vendre votre l'appartement ?
      </p>

      <div className="flex flex-col gap-3">
        {console.log(isValid+"--------")}
        {ArraySales.map(sales => {
          return (
            <label
              className={`border w-full text-left  px-8 py-4 rounded ${
                watch('sellingHouse') === sales.value ? 'border-[#f05623]' : ''
              } `}
            >
              <input
                type="radio"
                id="house"
                {...register('sellingHouse',{required:"choice value"})}
                value={sales.value}
                className="mr-2"
              />
              {sales.value}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SaleSelect;
