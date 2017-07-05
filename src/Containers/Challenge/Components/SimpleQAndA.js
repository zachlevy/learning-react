import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SimpleQAndA extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  assert(event) {
    console.log(this.state.input === this.props.answer)
  }
  handleKeyUp(e) {
    this.setState({input: e.target.value})
  }

  render() {
    return (
      <div className="container">
        <p>Question: {this.props.question}</p>
        <p>Answer: {this.props.answer}</p>
        <input onKeyUp={this.handleKeyUp.bind(this)} />
        <button onClick={this.assert.bind(this)}>Check</button>
      </div>
    )
  }
}

SimpleQAndA.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string
}

export default SimpleQAndA
