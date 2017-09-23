import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { track } from '../../../modules/analytics'

class SimpleSignup extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      showHelp: false,
      feedback: ""
    }
  }
  assert(event) {
    console.log()
    this.submitSignup(this.state.email)
  }

  // submit to api for analysis
  submitSignup(inputEmail) {
    if (inputEmail.length === 0) {
      this.setState({showHelp: true})
      return
    }
    fetch(`${process.env.REACT_APP_API_URL}/feedbacks`, {
      method: 'post',
      body: JSON.stringify({
        feedback: {
          body: {
            input: {
              email: inputEmail
            },
            challenge_id: this.props.challengeId,
            user_id: 1
          },
          source: "simple_signup"
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      this.props.handleShowNextButton()
      this.setState({feedback: "Success!"})
      return res.json()
    })
  }

  handleKeyUp(e) {
    this.setState({email: e.target.value})
    // check for enter key
    if (e.keyCode === 13) {
      this.assert()
    }
  }

  handleShowHelp(e) {
    track("Show Help", {
      name: "Help",
      action: "Show",
      challengeId: this.props.challengeId,
      content: this.props
    })
    this.setState({showHelp: true})
  }

  handleNextClick(e) {
    track("Attempt Next", {
      name: "Next",
      action: "Attempt",
      challengeId: this.props.challengeId,
      content: this.props,
      showHelp: this.state.showHelp,
      showNextButton: this.props.showNextButton,
      eventLabel: "showNextButton",
      eventValue: this.props.showNextButton ? 1 : 0
    })
    if (this.props.showNextButton) {
      this.props.handleNextClick()
    } else {
      this.setState({showHelp: true})
    }
  }

  render() {
    let help
    if (this.state.showHelp) {
      help = (
        <li className="list-inline-item">
          <div className="challenge-description">{this.props.challengeDescription}</div>
        </li>
      )
    } else {
      help = (
        <li className="list-inline-item">
          <button role="button" className="btn btn-link" onClick={this.handleShowHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
        </li>
      )
    }
    let feedback
    if (this.state.feedback) {
      feedback = (
        <div className="simple_q_and_a-feedback">
          <p>{this.state.feedback}</p>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2 text-center">
            <h4 className="simple_signup-callToActionText">{this.props.callToActionText}</h4>
            <br />
            <div className="form-group">
              <input className="form-control border-bottom" onKeyUp={this.handleKeyUp.bind(this)} placeholder="email@example.com" />
              <div className="row">
                <div className="col-12 col-sm-6">
                  {feedback}
                </div>
              </div>
            </div>
            <br />
            <button role="button" className="btn btn-outline-secondary btn-lg" onClick={this.assert.bind(this)}>{this.props.buttonText}</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <ul className="list-inline">
                {help}
                <li className="list-inline-item">
                  <button role="button" className="btn btn-link" onClick={this.props.handleBackButton.bind(this)}><span>back</span></button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-link" onClick={this.props.handleSkipClick.bind(this, this.props.challengeId, this.state.showHelp)}>skip</button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className={"btn btn-outline-secondary btn-lg" + (this.props.showNextButton ? "" : " disabled")} onClick={this.handleNextClick.bind(this)}>Next</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SimpleSignup.propTypes = {
  callToActionText: PropTypes.string,
  buttonText: PropTypes.string,

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default SimpleSignup
