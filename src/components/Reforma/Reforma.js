// @flow
import React, { Component } from 'react';

type ReformaProps = {

};

type ReformaState = {
  values: Object
};

class Reforma extends Component<ReformaProps, ReformaState> {
  constructor(props: ReformaProps) {
    super(props);

    this.state = {
      values: {}
    };

  }

  render() {
    return (
      <div>Reforma!!!!</div>
    );
  }
}

export default Reforma;