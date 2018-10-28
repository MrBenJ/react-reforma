// @flow
import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import TextAreaField from './TextAreaField';

describe('<TextAreaField> tests', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(
      <TextAreaField name="name" />
    );

    expect(wrapper.find('textarea[name="name"]')).toHaveLength(1);
  });

  it('Renders labels', () => {
    const wrapper = shallow(
      <TextAreaField name="name" label="Message" />
    );

    expect(wrapper.find('label').props()).toEqual({
      htmlFor: 'name',
      children: 'Message'
    });
  });

  it('Renders errors and values', () => {
    const wrapper = shallow(
      <TextAreaField
        name="naaaame"
        value="Hello"
        error="Not long enough"
      />
    );

    expect(wrapper.find('textarea').props().value).toBe('Hello');
    expect(wrapper.find('span')).toHaveLength(1);
  });

  it('Renders labels with labelProps object', () => {
    const wrapper = shallow(
      <TextAreaField
        name="message"
        label="Message"
        labelProps={{ id: 'happy_times' }}
      />
    );

    expect(wrapper.find('label#happy_times')).toHaveLength(1);
  });
});