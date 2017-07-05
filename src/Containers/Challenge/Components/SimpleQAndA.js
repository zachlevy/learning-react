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
        <div className="row">
          <div className="col-12">
            <p>Question: {this.props.question}</p>
            <p>Answer: {this.props.answer}</p>
            <input onKeyUp={this.handleKeyUp.bind(this)} />
            <button onClick={this.assert.bind(this)}>Check</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <button className="btn btn-secondary" onClick={this.props.handleSkipClick.bind(this)}>Skip</button>
              &nbsp;
              <button className="btn btn-primary" onClick={this.props.handleNextClick.bind(this)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SimpleQAndA.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string
}

export default SimpleQAndA
