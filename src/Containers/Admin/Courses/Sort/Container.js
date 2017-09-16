import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DropTarget, DragDropContext } from 'react-dnd';
import Card from './Card';
import ItemTypes from './ItemTypes';

const style = {
  width: 400,
};

const cardTarget = {
  drop() {
  },
};

// @DragDropContext(HTML5Backend)
class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.state = {
      cards: this.props.cards
    };
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      },
    }));
  }

  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card),
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards } = this.state;

    return connectDropTarget(
      <div style={style}>
        <pre>{JSON.stringify(cards)}</pre>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            text={card.description}
            moveCard={this.moveCard}
            findCard={this.findCard}
          />
        ))}
      </div>,
    );
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Container)
