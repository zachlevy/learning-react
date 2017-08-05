import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SentimentQAndA extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  assert(event) {
    console.log()

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
            analysis: "sentiment",
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
      if (response.input.result === this.props.sentiment) {
        this.props.handleShowNextButton()
      }
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
            <input onKeyUp={this.handleKeyUp.bind(this)} />
            < role="button" onClick={this.assert.bind(this)}>Check</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <button role="button" className="btn btn-outline-secondary" onClick={this.props.handleSkipClick.bind(this, this.props.challengeId, this.state.showHelp)}>skip</button>
              &nbsp;
              <button role="button" className={"btn btn-secondary" + (this.props.showNextButton ? "" : " disabled")} onClick={this.props.showNextButton && this.props.handleNextClick.bind(this)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SentimentQAndA.propTypes = {
  question: PropTypes.string,
  sentiment: PropTypes.string,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default SentimentQAndA
