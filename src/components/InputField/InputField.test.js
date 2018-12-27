// @flow

/* global
  describe
  it
  expect
*/

import React from 'react';
import { shallow } from 'enzyme';

import InputField from './InputField';

describe('<InputField> tests', () => {
  const renderShallow = props => shallow(<InputField {...props} />);

  it('Renders without crashing', () => {
    const wrapper = renderShallow({
      name: 'field-name',
      value: ''
    });

    expect(wrapper).toBeTruthy();
  });

  it('Renders a label', () => {
    const wrapper = renderShallow({
      label: 'First Name',
      name: 'first_name'
    });

    expect(wrapper.find('label').text()).toBe('First Name');
    expect(wrapper.find('label').props().htmlFor).toBe('first_name');
    expect(wrapper.find('input').props().name).toBe('first_name');
  });

  it('Renders placeholders', () => {
    const wrapper = renderShallow({
      name: 'first_name',
      placeholder: 'Enter Name Here'
    });

    expect(wrapper.find('input').props().placeholder).toBe('Enter Name Here');
  });

  it("Doesn't render a label if the label prop isn't passed in", () => {
    const wrapper = renderShallow({
      name: 'last_name'
    });

    expect(wrapper.find('label')).toHaveLength(0);
  });

  it('Passes through additional props', () => {
    const wrapper = renderShallow({
      name: 'hello',
      'data-render': 'hello'
    });

    expect(wrapper.find('[data-render]')).toHaveLength(1);
  });

  it('renders error span if an error is passed in', () => {
    const wrapper = renderShallow({
      name: 'goodbye',
      error: 'Invalid'
    });

    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('span').text()).toBe('Invalid');
  });

  it('renders label props', () => {
    const wrapper = renderShallow({
      name: 'hi',
      label: 'Heyo',
      labelProps: { className: 'joe' }
    });

    expect(wrapper.find('.joe')).toHaveLength(1);
  });
});
