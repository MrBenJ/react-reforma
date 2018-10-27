// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';

import Reforma from './Reforma';
import InputField from '../InputField';

describe('<Reforma> component tests', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(
      <Reforma onSubmit={() => {}}>
        <div>Child</div>
      </Reforma>
    );
    expect(wrapper).toBeTruthy();
  });

  it('Renders with InputField children', () => {
    const wrapper = shallow(
      <Reforma onSubmit={() => {}}>
        <InputField name="name" />
      </Reforma>
    );

    const input = wrapper.find('InputField').dive();

    expect(input.find('input')).toHaveLength(1);
    expect(input.find('input').props().name).toBe('name');
  });

  it('Renders multiple DOM elements', () => {
    const wrapper = mount(
      <Reforma onSubmit={() => {}}>
        <div className="foop">
          <InputField className="hey" name="name" />
          <span className="deepspan" />
        </div>
        <button type="submit">Submit</button>
      </Reforma>
    );

    const button = wrapper.find('button');

    expect(wrapper.find('.foop')).toHaveLength(1);
    expect(wrapper.find('.deepspan')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(button).toHaveLength(1);
    expect(button.text()).toBe('Submit');
  });

  it('handles change events for multiple inputs', () => {
    const wrapper = mount(
      <Reforma onSubmit={() => {}}>
        <div className="foop">
          <InputField className="hey" name="name" />
          <span className="deepspan" />
          <div>
            <div>
              <InputField name="user" />
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </Reforma>
    );

    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'hello'
      }
    });

    expect(wrapper.state().name).toBe('hello');

    wrapper.find('input[name="user"]').simulate('change', {
      target: {
        name: 'user',
        value: 'jeff'
      }
    });

    expect(wrapper.state().user).toBe('jeff');

  });
});
