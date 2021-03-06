// @flow
import React, { type Node } from 'react';

import type { BaseFieldProps } from '../signatures';

type SelectFieldProps = {
  children: any
  /*
    TODO: Figure this typechecking out.

  children: Element<'option'>
    | Array<Element<'option'>>
    | Array<Element<'option'>|OptionReturnFunction>
    | () => Element<'option'> | Array<Element<'option'>>
  */
} & BaseFieldProps;

export default function SelectField(props: SelectFieldProps): Node {
  const {
    className,
    children,
    onChange,
    value,
    name,
    label,
    labelProps,
    error
  } = props;
  let generatedChildren = null;

  if (Array.isArray(children)) {
    generatedChildren = children.map(child => {
      return typeof child === 'function' ? child() : child;
    });
  }

  if (typeof children === 'function') {
    generatedChildren = children();
  }

  return (
    <>
      {label && (
        <label htmlFor={name} {...labelProps}>
          {label}
        </label>
      )}
      <select
        className={className}
        name={name}
        onChange={onChange}
        value={value}>
        {generatedChildren || children}
      </select>
      {error && <span>{error}</span>}
    </>
  );
}

SelectField.defaultProps = {
  injectOnChange: true,
  value: '',
  onChange: () => {},
  labelProps: {}
};
