//@flow
import React, { type Node } from 'react';
import InputMask from 'react-input-mask';

import type { BaseFieldProps } from '../signatures';

type InputFieldProps = {
  type: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number',

  mask?: ?string
} & BaseFieldProps;

export default function InputField(props: InputFieldProps): Node {
  const {
    type,
    className,
    label,
    labelProps,
    placeholder,
    error,
    value,
    name,
    mask,
    onChange,
    injectOnChange: ignored,
    ...rest
  } = props;

  const fieldProps = {
    className,
    placeholder,
    type,
    value,
    name,
    onChange
  };

  return (
    <>
      {label && (
        <label htmlFor={name} {...labelProps}>
          {label}
        </label>
      )}
      {mask ? (
        <InputMask mask={mask} {...fieldProps} {...rest} />
      ) : (
        <input {...fieldProps} {...rest} />
      )}
      {error && <span>{error}</span>}
    </>
  );
}

InputField.defaultProps = {
  value: '',
  type: 'text',
  injectOnChange: true,
  onChange: () => {},
  labelProps: {}
};
