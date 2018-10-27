Reforma
=======

[![Greenkeeper badge](https://badges.greenkeeper.io/MrBenJ/react-reforma.svg)](https://greenkeeper.io/)

## A Local State Driven Approach to Forms in React

Reforma focuses on creating forms quickly and easily, by letting the developer
worry about things like `validation` and `server responses`. Utilizing and easy
to use plug-and-play API, Reforma makes building forms easy.

```js
import Reforma, { InputField, CheckboxField } from 'react-reforma';
import CustomCheckboxLabel from './components/CustomCheckboxLabel';

export default function LoginForm(props) {
  const { onSubmit, errors } = props;

  return (
    <Reforma onSubmit={onSubmit} errors={errors}>
      <h2>Enter your credentials</h2>
      <InputField name="username" />
      <InputField type="password" name="password" />
      <CheckboxField
        label={<CustomCheckboxLabel label="Remember Me" />}
      />
      <button type="submit">Login</button>
      <div className="login-links">
        <a href="/reset-password">Forgot Password?</a>
        <a href="/register">New User? Register here</a>
      </div>
    </Reforma>
  );
}
```

* No need to write `onChange` props for input fields, all that is handled for
you.

* No need to worry about the state of the form. The local state is handled and
update for you.

* No need to worry about 3rd party validation libraries either. **Reforma** uses
 only vanilla React 16.

Reforma is focused 100% on the _construction and building_ of forms, leaving
elements like validation and submit logic to the developer, not out of the box
like other form libraries.

## Why Reforma, and not Redux-Form or Formik?

Redux-Form and Formik are excellent and well written tools that make creating
forms fast and easy, but I noticed that there's something missing from forms in
React:

* **Redux-Form causes unnecessary re-renders** - Whenever there's a change event
 in Redux-Form, the entire app from the `Provider` component emits three
 distinct actions, `onKeyUp`, `onKeyDown`, and `onChange`.

  * **Redux-State** is meant for ephemeral state to be shared between many
    components, not just one component. If the values of a form need to travel
    to many different components that don't have a parent-child relationship,
    Redux-Form is great! But otherwise, it's just not efficient and abusing
    Redux state.

* **Formik** has all the bells and whistles with validation and submit logic.
  While I really like Formik and everything it has to offer, it can make your
  form look really big and bloated. I'm a firm believer in having errors passed
  in from the parent component's state, and values to live in the individual
  component's state

* **Reforma** Focuses solely on the building of forms, and leaves whatever you
want to use for validation and form submission to your own devices. Every server
 interprets data differently, handles errors and validation their own way,
 whether it's client-side or server-side, and does its own submit logic their
 own way.

In a nutshell, **Reforma** is completely agnostic to validation and submission.
It only worries about building forms quickly and easily without styling.

## Installation

You can install Reforma with some quick `npm` commands:

```bash
npm install react-reforma --save
```

Or if you're using `yarn`

```bash
yarn add react-reforma
```

The default export is the root `Reforma` element

```js
import Reforma from 'react-reforma';
```

You can also import the form fields here as well:
```js
import Reforma, {
  InputField,
  SelectField,
  RadioButtonField } from 'react-reforma';
```

## Usage

All Reforma fields need to live as a child of `<Reforma>`

```js
import React, { Component } from 'react';
import Reforma, {
  InputField,
  SelectField,
  RadioButtonField } from 'react-reforma'


class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onSubmit(values) {
    // Your submit logic goes here!
  }

  validate(values) {
    // Your validation logic goes here!
    if (!values.email.test(/[A-Z][a-z]/) {
      this.setState({
        errors: {
          email: 'Invalid email address'
        }
      });
    }
  }

  render() {
    return (
      <Reforma
        onSubmit={this.onSubmit}
        onValueChange={this.validate}
        errors={this.state.errors}>
        <InputField
          name="first_name"
          label="First Name"
          placeholder="Enter your name"
        />
        <InputField
          name="last_name"
          label="Last Name"
          placeholder="Enter your surname"
        />
        <InputField
          name="email"
          type="email"
          placeholer="name@example.com"
        />
      </Reforma>
    );
  }
}

export default MyComponent;
```

## API REFERENCE

// TODO: Finish this stuff.
