// @flow
import React from 'react';

import { type BaseFieldProps } from '../signatures';

type CheckboxFieldProps = {

} & BaseFieldProps;

export default function CheckboxField(props: CheckboxFieldProps) {
  const {
    className,
    label,
    labelProps,
    error,
    name,
    value,
    injectOnChange,
    ...rest
  } = props;
  return (
    <>
      {label && <label htmlFor={name} {...labelProps}>{label}</label>}
      <input
        className={className}
        type="checkbox"
        name={name}
        value={value}
        checked={Boolean(value)}
        {...rest}
      />
      { error && <span>{error}</span>}
    </>
  );
}

CheckboxField.defaultProps = {
  onChange: () => {},
  value: '',
  injectOnChange: true,
  labelProps: {}
};