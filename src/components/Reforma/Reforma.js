// @flow
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import type { Element, Node } from 'react';

type ReformaProps = {
  /** @type {String} className - String to pass in as a className */
  className?: ?string,

  /** @type {Function} onSubmit - Function */
  onSubmit: Object => void,

  /** @type {Function} onValueChange - Callback to send all values back when any field is changed */
  onValueChange?: ?(Object) => void,

  /** @type {|Array<Node>|Node} children - <*Field> elements */
  children: Node | () => Node | Array<Node>,

  /** @type {Object} initialValues - an Object containing intiial pre-populated values */
  initialValues?: Object,

  /** @type {Object} Errors to show for fields */
  errors: Object,

  /** @type {Object} props to add to every field element */
  fieldProps?: ?Object
};

type ReformaState = Object;

class Reforma extends PureComponent<ReformaProps, ReformaState> {
  constructor(props: ReformaProps) {
    super(props);
    const { initialValues } = props;

    this.state = {
      ...initialValues
    };
  }

  static defaultProps = {
    initialValues: {},
    errors: {},
    fieldProps: {}
  }

  get values() {
    return this.state;
  }

  /**
   * Submits the form
   * @param  {SyntheticEvent} event: SyntheticEvent<HTMLFormElement> The form
   * @return {undefined}
   */
  onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  /**
   * onChange event to add to ann <*Field> elements
   * @param  {SyntheticInputEvent} event - The raw React Event
   * @return {undefined}
   */
  onChange = (event: SyntheticInputEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { target: { name, value, type, checked} } = event;

    // If the value is coming from a checkbox, typecast it to a Boolean
    if(type === 'checkbox') {
      this.setState({
        [name]: Boolean(checked)
      });
      return;
    }

    const pendingState = {
      [name]: value
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
    const { errors, fieldProps } = this.props;

    if (!child) {
      return child;
    }

    if (typeof child === 'function') {
      const result = child();
      return React.cloneElement(result, {
        children: React.Children.map(result.props.children, this._cloneChildren)
      });
    }

    // Only inject onChange prop if injectOnChange is true
    const isFieldComponent = child?.props?.injectOnChange;

    // Found a <*Field> Component. Inject the props.
    if (isFieldComponent) {
      const { name, className: childClassName } = child.props;

      const injectedProps = {
        ...fieldProps,
        className: classNames(childClassName, fieldProps.className),
        onChange: this.onChange,
        value: this.state[name],
        error: errors[name]
      };
      return React.cloneElement(child, injectedProps);
    }

    // If there's React element(s) as a child(ren):
    // Clone through all the children recursively
    if (child?.props?.children) {
      if(React.isValidElement(child.props.children) || Array.isArray(child.props.children)) {
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, this._cloneChildren)
        });
      }
    }

    // If all else fails, just clone the element
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
    if (onValueChange) {
      onValueChange(this.state);
    }
  }
}

export default Reforma;
