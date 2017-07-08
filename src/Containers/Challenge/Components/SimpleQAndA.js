import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SimpleQAndA extends Component {
  constructor() {
    super()
    this.state = {

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
    fetch(`http://localhost:3001/challenge_responses`, {
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
              <button className={"btn btn-primary" + (this.props.showNextButton ? "" : " disabled")} onClick={this.props.showNextButton && this.props.handleNextClick.bind(this)}>Next</button>
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

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number
}

export default SimpleQAndA
