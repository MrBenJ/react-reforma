// @flow
import React, { type Node } from 'react';

import { type BaseFieldProps } from '../signatures';

type CheckboxFieldProps = {

} & BaseFieldProps;

export default function CheckboxField(props: CheckboxFieldProps): Node {
  const {
    className,
    label,
    labelProps,
    error,
    name,
    value,
    injectOnChange: ignored,
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
