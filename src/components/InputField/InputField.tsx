/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import './InputField.scss';

type PropTypes = {
  values?: string | number;
  handleChange: any;
  type: string;
  placeholder?: string;
  text: string;
  id: string;
  min?: string
};

export const InputField: React.FC<PropTypes> = ({
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
};
