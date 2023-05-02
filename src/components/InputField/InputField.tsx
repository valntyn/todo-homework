import React, { ChangeEvent, memo } from 'react';

import './InputField.scss';

type PropTypes = {
  values?: Date | string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
  text: string;
  id: string;
  min?: string
};

export const InputField: React.FC<PropTypes> = memo(({
  values,
  handleChange,
  type,
  placeholder,
  text,
  id,
  min,
}) => {
  return (
    <label className="field" htmlFor={id}>
      {text}
      <input
        className="field__inp"
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={values}
        id={id}
        min={min}
        autoComplete="off"
      />
    </label>
  );
});
