import { useState } from 'react';

const CounterStep = ({
  register,
  watch,
  setValue,
  label,
  name,
  id,
  array,
  errors,
  min,
  max,
  clearErrors,
}) => {
  const ValueCounter = watch(`${array}.${[name]}`);
  const test = watch(`${array}`);
  const increaseCounterAppart = e => {
    const { id, name } = e.target;

    if (isNaN(watch(`${array}.${[name]}`)))
      return setValue(`${array}.${[name]}`, Number(1), {
        shouldValidate: true,
      });

    if (watch(`${array}.${[name]}`) < max)
      return (
        setValue(
          `${array}.${[name]}`,
          Number(watch(`${array}.${[name]}`)) + Number(1),
          { shouldValidate: true }
        ) && clearErrors(`${array}.${[name]}`)
      );
  };
  const decreaseCounterAppart = e => {
    const { id, name } = e.target;
    if (Number(watch(`${array}.${[name]}`)) > min) {
      setValue(`${array}.${[name]}`, Number(watch(`${array}.${[name]}`)) - 1, {
        shouldValidate: true,
      });
    }
  };

  return (
    <>
      <label>{label}</label>
      <div className="rounded-l inline-flex">
        <button
          className="border px-8 py-4 rounded-l"
          onClick={decreaseCounterAppart}
          name={name}
        >
          -
        </button>
        <input
          id={id}
          type="number"
          value={ValueCounter}
          {...register(`${array}.${[name]}`, {
            required: 'La valeur ne peu être null',
            max: {
              value: max,
              message: `La valeur ne peu être supérieur à ${max}`, // JS only: <p>error message</p> TS only support string
            },
            min: {
              value: min,
              message: `La valeur ne peu être inférieur à ${min}`, // JS only: <p>error message</p> TS only support string
            },
          })}
          className="inline-flex border px-8 py-4 outline-none text-center w-full"
        />
        <button
          className="border px-8 py-4 rounded-r"
          id={id}
          onClick={e => {
            increaseCounterAppart(e);
            clearErrors(`${array}.${[name]}`);
          }}
          name={name}
        >
          +
        </button>
      </div>

      {errors[array] && (
        <p className="text-red-600 ">{errors[array]?.[name]?.message}</p>
      )}
    </>
  );
};

export default CounterStep;
