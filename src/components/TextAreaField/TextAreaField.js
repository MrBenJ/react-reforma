// @flow
import React from 'react';

import { type BaseFieldProps } from '../signatures';

type TextAreaFieldProps = {
  // Lol whoops
} & BaseFieldProps;

export default function TextAreaField(props: TextAreaFieldProps) {
  const {
    name,
    label,
    labelProps,
    injectOnChange,
    onChange,
    value,
    error,
    ...rest
  } = props;
  return (
    <>
      <label htmlFor={name} {...labelProps}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      { error && <span>{error}</span>}
    </>
  );
}

TextAreaField.defaultProps = {
  onChange: () => {},
  value: '',
  injectOnChange: true,
  labelProps: {}
};
