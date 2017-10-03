import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { track } from '../../../modules/analytics'
import { markdownToHTML } from '../../../modules/strings'
import { apiRequest } from '../../../modules/data'

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
    this.submitSignup(this.state.email)
  }

  // submit to api for analysis
  submitSignup(inputEmail) {
    if (inputEmail.length === 0) {
      this.setState({showHelp: true})
      return
    }
    apiRequest("/feedbacks", {
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
      })
    }, (response) => {
      this.props.handleShowNextButton()
      this.setState({feedback: "Success!"})
    })
  }

  handleKeyUp(e) {
    this.setState({email: e.target.value})
    // check for enter key
    if (e.keyCode === 13) {
      this.assert()
    }
  }

  toggleHelp(e) {
    track("Toggle Help", {
      name: "Help",
      action: "Toggle",
      challengeId: this.props.challengeId,
      content: this.props
    })
    this.setState({showHelp: !this.state.showHelp})
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
      this.props.submitChallengeResponse(null, "complete")
      this.props.handleNextClick()
    } else {
      this.setState({showHelp: true})
    }
  }

  render() {
    let help
    help = (
      <li className="list-inline-item">
        <button className="btn btn-link btn-pointer" onClick={this.toggleHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
      </li>
    )
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
          <div className="col-12 col-lg-8 offset-lg-2">
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
            <button className="btn btn-outline-secondary btn-lg btn-pointer" onClick={this.assert.bind(this)}>{this.props.buttonText}</button>
            <br />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            {this.state.showHelp && (markdownToHTML(this.props.help) || "Signup if you'd like.")}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <ul className="list-inline">
                {help}
                <li className="list-inline-item">
                  <button className="btn btn-link btn-pointer" onClick={this.props.handleBackButton.bind(this)}><span>back</span></button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-link btn-pointer" onClick={this.props.handleSkipClick.bind(this, this.props.challengeId, this.state.showHelp)}>skip</button>
                </li>
                <li className="list-inline-item">
                  <button className={"btn btn-outline-secondary btn-lg btn-pointer" + (this.props.showNextButton ? "" : " disabled")} onClick={this.handleNextClick.bind(this)}>Next</button>
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
  help: PropTypes.string,

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string,
  submitChallengeResponse: PropTypes.func
}

export default SimpleSignup
