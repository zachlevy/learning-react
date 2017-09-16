import React, { Component } from 'react';
import Container from './Container';

export default class SortableCancelOnDropOutside extends Component {
  render() {
    return (
      <div>
        <Container cards={this.props.cards} />
      </div>
    );
  }
}
