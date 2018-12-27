// @flow

/* global
  describe
  it
  expect
*/

import React from 'react';
import { shallow } from 'enzyme';

import RadioButtonField from './RadioButtonField';

describe('<RadioButtonField>', () => {
  // const renderShallow = props => shallow(<RadioButtonField {...props} />);

  it('Renders without crashing', () => {
    const wrapper = shallow(
      <RadioButtonField id="dude" name="first" radioValue="1" />
    );

    expect(wrapper).toBeTruthy();
    expect(wrapper.find('input[type="radio"]')).toHaveLength(1);
  });

  it('Renders a label if passed in', () => {
    const wrapper = shallow(
      <RadioButtonField
        id="dude"
        name="first"
        radioValue="1"
        label="Credit Card"
      />
    );

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label').text()).toBe('Credit Card');
  });

  it('Renders a React Node as a label', () => {
    const wrapper = shallow(
      <RadioButtonField
        id="dude"
        name="card"
        radioValue="2"
        label={<div className="my-label">Hello. I am a large label</div>}
      />
    );

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('.my-label')).toHaveLength(1);
  });

  it('Renders label props', () => {
    const wrapper = shallow(
      <RadioButtonField
        id="dude"
        name="card"
        radioValue="x"
        label="X card"
        labelProps={{ id: 'secret_card_value' }}
      />
    );

    expect(wrapper.find('#secret_card_value')).toHaveLength(1);
  });
});
