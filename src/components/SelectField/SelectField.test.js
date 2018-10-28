// @flow
import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import SelectField from './SelectField';

describe('<SelectField> tests', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(
      <SelectField name="select">
        <option value="value">Val</option>
      </SelectField>
    );

    expect(wrapper).toBeTruthy();
  });

  it('Renders options', () => {
    const wrapper = shallow(
      <SelectField name="select">
        <option value="value">Val</option>
        <option value="other">Other</option>
      </SelectField>
    );

    expect(wrapper.find('option')).toHaveLength(2);
  });

  it('Renders with function as child', () => {
    const wrapper = shallow(
      <SelectField name="select">
        {() => {
          return [...Array(5).keys()].map(val => {
            return (
              <option key={val} value={val}>
                {val}
              </option>
            );
          });
        }}
      </SelectField>
    );
    expect(wrapper.find('option')).toHaveLength(5);
  });

  it('Works with array of children', () => {
    const wrapper = shallow(
      <SelectField name="select">
        <option value="">Select a value</option>
        {() => {
          return ['one', 'two', 'three'].map((item, idx) => {
            return (
              <option key={idx} value={item}>
                {item}
              </option>
            );
          });
        }}
      </SelectField>
    );

    expect(wrapper.find('option')).toHaveLength(4);
  });

  it('Renders labelProps', () => {
    const wrapper = shallow(
      <SelectField
        name="select"
        label="Select something"
        labelProps={{ className: 'labelerino'}}>
        <option value="value">Val</option>
        <option value="other">Other</option>
      </SelectField>
    );

    expect(wrapper.find('.labelerino')).toHaveLength(1);
  });


});
