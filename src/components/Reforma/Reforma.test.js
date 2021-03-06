// @flow
/* globals
 describe
 it
 xit
 jest
 expect
*/
import React from 'react';
import { shallow, mount } from 'enzyme';

import Reforma from './Reforma';
import InputField from '../InputField';
import CheckboxField from '../CheckboxField';

describe('<Reforma> component tests', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(
      <Reforma onSubmit={() => {}}>
        <div>Child so flow does not get angry with me :)</div>
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

  it('Gracefully handles null or undefined children', () => {
    const wrapper = mount(
      <Reforma onSubmit={() => {}}>
        {undefined}
        <div className="hello">I am a div!</div>
        {null}
        <InputField name="name" />
      </Reforma>
    );

    expect(wrapper).toBeTruthy();

    const nameInput = wrapper.find('input[name="name"]');
    expect(nameInput).toHaveLength(1);

    nameInput.simulate('change', {
      target: {
        name: 'name',
        value: 'Joe'
      }
    });

    expect(wrapper.state('name')).toBe('Joe');
  });

  xit('runs onSubmit', () => {
    // TODO: Fix this test.
    // Find why onSubmit isn't running with simulated events
    const onSubmit = () => {};

    const wrapper = mount(
      <Reforma onSubmit={onSubmit}>
        <InputField name="name" />
        <button type="submit">Submit</button>
      </Reforma>
    );

    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        value: 'guy',
        name: 'name'
      }
    });
    wrapper.find('button[type="submit"]').simulate('click');
  });

  xit('Can take a child as a function', () => {
    // TODO: Fix this test. Find a way to get enzyme
    // to run function as a child

    const wrapper = mount(
      <Reforma onSubmit={() => {}}>
        {() => {
          return ['first_name', 'last_name'].map(name => {
            return <InputField key={name} name={name} />;
          });
        }}
      </Reforma>
    );
    const fields = wrapper.find('input[type="text"]');
    expect(fields).toHaveLength(2);
  });

  it('Runs onValueChange', () => {
    const onValueChange = jest.fn();

    const wrapper = mount(
      <Reforma onSubmit={() => {}} onValueChange={onValueChange}>
        <InputField name="name" />
      </Reforma>
    );

    wrapper.find('input[type="text"]').simulate('change', {
      target: {
        value: 'hey',
        name: 'name'
      }
    });

    expect(onValueChange).toHaveBeenCalledWith({ name: 'hey' });
  });

  it('Gets values with convenience getter', () => {
    const wrapper = mount(
      <Reforma onSubmit={() => {}}>
        <InputField name="name" />
        <InputField name="job" />
      </Reforma>
    );

    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        value: 'Tim',
        name: 'name'
      }
    });

    wrapper.find('input[name="job"]').simulate('change', {
      target: {
        value: 'Developer',
        name: 'job'
      }
    });

    const instance = wrapper.instance();

    expect(instance.values).toEqual({
      name: 'Tim',
      job: 'Developer'
    });
  });

  it('injects the "fieldProps" prop into all field components if passed in', () => {
    const fieldProps = {
      className: 'input-field',
      'data-important': 'yes'
    };

    const wrapper = mount(
      <Reforma onSubmit={() => {}} fieldProps={fieldProps}>
        <InputField name="name" />
        <InputField name="age" />
      </Reforma>
    );

    expect(wrapper.find('input[data-important="yes"]')).toHaveLength(2);
    expect(wrapper.find('input.input-field')).toHaveLength(2);
  });

  it('respects individual field class names', () => {
    const fieldProps = {
      className: 'input-field',
      'data-important': 'yes'
    };

    const wrapper = mount(
      <Reforma onSubmit={() => {}} fieldProps={fieldProps}>
        <InputField className="first-name-highlight" name="name" />
        <InputField name="age" />
      </Reforma>
    );

    expect(wrapper.find('input.input-field')).toHaveLength(2);
    expect(wrapper.find('input.first-name-highlight')).toHaveLength(1);
  });

  describe('Working with checkbox fields', () => {
    it('handles onChange events from a checkbox', () => {
      const wrapper = mount(
        <Reforma onSubmit={() => {}}>
          <CheckboxField name="remember" />
        </Reforma>
      );

      wrapper.find('input[type="checkbox"]').simulate('change', {
        target: {
          type: 'checkbox',
          checked: true,
          name: 'remember'
        }
      });

      expect(wrapper.state().remember).toBe(true);
    });
  });
});
