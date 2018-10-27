// @flow
import React from 'react';

import { type BaseFieldProps } from '../signatures';

type CheckboxFieldProps = {

} & BaseFieldProps;

export default function CheckboxField(props: CheckboxFieldProps) {
  const {
    className,
    label,
    error,
    name,
    value,
    ...rest
  } = props;

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={className}
        type="checkbox"
        name={name}
        value={value}
        {...rest}
      />
      {/* TODO: Add checked state */}
    </>
  );
}

CheckboxField.defaultProps = {
  onChange: () => {},
  value: '',
  injectOnChange: true
};