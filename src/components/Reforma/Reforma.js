// @flow
import React, { Component } from 'react';
import type { Element, Node } from 'react';

type ReformaProps = {
  /** @type {String} className - String to pass in as a className */
  className?: ?string,

  /** @type {Function} onSubmit - Function */
  onSubmit: Object => void,

  /** @type {Function} onValueChange - Callback to send all values back when any field is changed */
  onValueChange?: ?(Object) => void,

  /** @type {|Array<Node>|Node} children - <*Field> elements */
  children: Array<Node> | Node,

  /** @type {Object} initialValues - an Object containing intiial pre-populated values */
  initialValues?: Object,

  /** @type {Object} Errors to show for fields */
  errors: Object
};

type ReformaState = {
  values: Object
};

class Reforma extends Component<ReformaProps, ReformaState> {
  constructor(props: ReformaProps) {
    super(props);
    const { initialValues } = props;

    this.state = {
      values: { ...initialValues }
    };
  }

  static defaultProps = {
    initialValues: {},
    errors: {}
  }

  onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { values } = this.state;
    onSubmit(values);
  }

  onChange = (event: SyntheticInputEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { target: { name, value } } = event;
    const { values } = this.state;

    const pendingState = {
      values: {
        ...values,
        [name]: value
      }
    };

    this.setState(pendingState);
  }

  /**
   * A recursive internal method that attaches onChange, value, and errors
   * to any Reforma fields
   * @param  {Element<any>} child: Element<any> children passed into React.Children.map
   * @return {ReactElement<any>}
   */
  _cloneChildren = (child: Element<any>) => {
    const { errors } = this.props;
    const { values } = this.state;

    // If there's React element(s) as a child, clone through all the children recursively
    if (child.props.children) {
      if(React.isValidElement(child.props.children) || Array.isArray(child.props.children)) {
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, this._cloneChildren)
        });
      }
    }

    // Only inject onChange prop if injectOnChange is true
    const isFieldComponent = child.props.injectOnChange;

    // Found a <*Field> Component. Inject the props.
    if (isFieldComponent) {
      const { name } = child.props;
      const injectedProps = {
        onChange: this.onChange,
        value: values[name],
        errors: errors[name]
      };

      return React.cloneElement(child, injectedProps);
    }

    // If all else fails, just clone the element and call it a day. Maybe have a beer or 6.
    return React.cloneElement(child);
  }

  render() {
    const { children, className } = this.props;
    const InjectedChildren = React.Children.map(children, this._cloneChildren);

    return (
      <form className={className} onSubmit={this.onSubmit}>
        {InjectedChildren}
      </form>
    );
  }

  componentDidUpdate() {
    const { onValueChange } = this.props;
    console.log(this.state.values);
    if (onValueChange) {
      onValueChange(this.state.values);
    }
  }
}

export default Reforma;