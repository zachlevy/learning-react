import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SimpleQAndA extends Component {
  constructor() {
    super()
    this.state = {
      input: ""
    }
  }
  assert(event) {
    console.log()
    let answered
    answered = this.state.input === this.props.answer
    if (answered) {
      this.props.handleShowNextButton()
    }

    // check if answer is correct
    this.submitChallengeResponse(this.state.input)
  }

  // submit to api for analysis
  submitChallengeResponse(inputText) {
    fetch(`${process.env.REACT_APP_API_URL}/challenge_responses`, {
      method: 'post',
      body: JSON.stringify({
        challenge_response: {
          input: {
            analysis: "none",
            text: inputText
          },
          challenge_id: this.props.challengeId,
          user_id: 1
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
    })
  }

  handleKeyUp(e) {
    this.setState({input: e.target.value})
  }

  render() {
    const remainingCharacters = this.props.max_length - this.state.input.length
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2 text-center">
            <h1 className="simple_q_and_a-question">{this.props.question}</h1>
            <div className="form-group">
              <input className="form-control border-bottom" onKeyUp={this.handleKeyUp.bind(this)} />
              <span className={"pull-right" + (remainingCharacters < 0 ? " color-red" : "")}>{remainingCharacters}</span>
            </div>
            <br />
            <button role="button" className="btn btn-secondary" onClick={this.assert.bind(this)}>Check Answer</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <ul className="list-inline">
                <li className="list-inline-item challenge-description">{this.props.challengeDescription}</li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-outline-secondary" onClick={this.props.handleSkipClick.bind(this)}>Skip</button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className={"btn btn-secondary" + (this.props.showNextButton ? "" : " disabled")} onClick={this.props.showNextButton && this.props.handleNextClick.bind(this)}>Next</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SimpleQAndA.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  max_length: PropTypes.number,

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default SimpleQAndA
