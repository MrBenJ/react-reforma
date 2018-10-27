// @flow
import React from 'react';

import { type BaseFieldProps } from '../signatures';

type TextAreaFieldProps = {

} & BaseFieldProps;

export default function TextAreaField(props: TextAreaFieldProps) {
  const {
    name,
    label,
    value,
    error
  } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} value={value} />
      { error && <span>{error}</span>}
    </>
  );
}

TextAreaField.defaultProps = {
  onChange: () => {},
  value: '',
  injectOnChange: true
};
