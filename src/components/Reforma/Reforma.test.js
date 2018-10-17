import test from 'ava';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import Reforma from './Reforma';
import InputField from '../InputField';

Enzyme.configure({ adapter: new Adapter() });

test.beforeEach(t => {
  global.window = (new JSDOM(`<html></html>`, { runScripts: "dangerously" })).window;
  global.document = global.window.document;

});

test('Renders without crashing', t => {
  const wrapper = shallow(
    <Reforma onSubmit={() => {}} />
  );

  t.truthy(wrapper);
});

test('Renders with InputField children', t => {
  const wrapper = shallow(
    <Reforma onSubmit={() => {}}>
      <InputField name="name" />
    </Reforma>
  );

  const input = wrapper.find('InputField').dive();

  t.is(input.find('input').length, 1);
  t.is(input.find('input').props().name, 'name');
});

test('Renders multiple DOM elements', t => {
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

  t.is(wrapper.find('.foop').length, 1);
  t.is(wrapper.find('.deepspan').length, 1);
  t.is(wrapper.find('input').length, 1);
  t.is(button.length, 1);
  t.is(button.text(), 'Submit');

});

test('handles change events for multiple inputs', t => {
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

  t.is(wrapper.state().values.name, 'hello');

  wrapper.find('input[name="user"]').simulate('change', {
    target: {
      name: 'user',
      value: 'jeff'
    }
  });

  t.is(wrapper.state().values.user, 'jeff');
});



test.todo('Deep field onChange events');

test.todo('Submit events');


