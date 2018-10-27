import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import RadioButtonField from './RadioButtonField';


describe('<RadioButtonField>', () => {
  const renderShallow = props => shallow(<RadioButtonField {...props} />);

  it('Renders without crashing', () => {
    const wrapper = renderShallow({
      name: 'first',
      value: '1'
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.find('input[type="radio"]')).toHaveLength(1);
  });

  it('Renders a label if passed in', () => {
    const wrapper = renderShallow({
      name: 'first',
      value: '1',
      label: 'Credit Card'
    });

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label').text()).toBe('Credit Card');
  });

  it('Renders a React Node as a label', () => {
    const wrapper = renderShallow({
      name: 'card',
      value: '2',
      label: <div className="my-label">Hello. I am a large label</div>
    });

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('.my-label')).toHaveLength(1);
  });
});
