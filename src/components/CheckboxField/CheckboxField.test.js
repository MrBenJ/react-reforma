// @flow

/* global
  describe
  it
  expect
  jasmine
*/
import React from 'react';
import { shallow } from 'enzyme';

import CheckboxField from './CheckboxField';
describe('<CheckboxField> tests', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<CheckboxField name="one" />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('Renders with all props', () => {
    const wrapper = shallow(
      <CheckboxField
        name="help"
        className="my"
        label="horses"
        value="are"
        id="going"
        onChange={() => {}}
        data-crazy="haywire"
      />
    );
    const inputElProps = wrapper.find('input').props();
    expect(inputElProps).toEqual({
      checked: true,
      className: 'my',
      onChange: jasmine.any(Function),
      type: 'checkbox',
      name: 'help',
      value: 'are',
      id: 'going',
      'data-crazy': 'haywire'
    });

    const labelEl = wrapper.find('label');
    expect(labelEl.props()).toEqual({
      htmlFor: 'help',
      children: 'horses'
    });
  });

  it('Can use an element as a label prop', () => {
    const wrapper = shallow(
      <CheckboxField
        name="houses"
        label={<div className="its-a-me">Mario!</div>}
      />
    );
    expect(wrapper.find('.its-a-me')).toHaveLength(1);
  });

  it('Passes in labelProps', () => {
    const wrapper = shallow(
      <CheckboxField
        name="remember"
        label="Remember username?"
        labelProps={{ className: 'foo' }}
      />
    );

    expect(wrapper.find('.foo')).toHaveLength(1);
  });
});
