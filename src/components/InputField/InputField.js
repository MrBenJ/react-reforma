//@flow
import React, { type Node } from 'react';
import InputMask from 'react-input-mask';

import type { BaseFieldProps } from '../signatures';

type InputFieldProps = {

  type: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number',

  mask?: ?string

} & BaseFieldProps;

export default function InputField(props: InputFieldProps) {
  const {
    type,
    className,
    label,
    placeholder,
    errors,
    value,
    name,
    mask,
    onChange,
    injectOnChange,
    ...rest
  } = props;

  const fieldProps = {
    placeholder,
    value,
    name,
    onChange
  };

  return (
    <div className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      {mask ? (
        <InputMask mask={mask} {...fieldProps} {...rest} />
      ) : (
        <input type={type} {...fieldProps} {...rest} />
      )}

      {errors && <span className="error">{errors}</span>}
    </div>
  );
}

InputField.defaultProps = {
  value: '',
  type: 'text',
  injectOnChange: true,
  onChange: () => {}
};
