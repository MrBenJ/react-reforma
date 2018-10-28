//@flow
import React, { type Node } from 'react';
// import classNames from 'classnames';

import type { BaseFieldProps } from '../signatures';

type RadioButtonFieldProps = BaseFieldProps & {
  /** @type {String} a unique id for the element. Required for radio buttons because id is used in place of "name" for htmlFor */
  id: string,

  /** @type {String} radioValue - value of the radio button */
  radioValue: string
};

export default function RadioButtonField(props: RadioButtonFieldProps): Node {
  const {
    id,
    label,
    labelProps,
    className,
    error,
    name,
    radioValue,
    value,
    onChange,
    injectOnChange,
    ...rest
  } = props;

  let labelElement = null;
  if (label && React.isValidElement(label)) {
    labelElement = React.cloneElement((label: any), {
      'data-selected': radioValue === value
    });
  }

  return (
    <>
      {label && <label htmlFor={id} {...labelProps}>{labelElement || label}</label>}
      <input
        id={id}
        className={className}
        type="radio"
        value={radioValue}
        checked={radioValue === value}
        name={name}
        onChange={onChange}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

RadioButtonField.defaultProps = {
  value: '',
  injectOnChange: true,
  onChange: () => {},
  labelProps: {}
};
