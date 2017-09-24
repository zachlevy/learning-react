import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import reactStringReplace from 'react-string-replace'
import { track } from '../../../modules/analytics'
import { markdownToHTML } from '../../../modules/strings'

class OpenEndedQ extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      showHelp: false,
      feedback: "",
      showSubmitButton: true
    }
  }
  assert(event) {
    console.log("assert")
    let answered = this.state.input.length > this.props.min_length
    if (answered) {
      this.props.handleShowNextButton()
    }
  }

  // submit to api for analysis
  submitChallengeResponse(inputText) {
    console.log("submitChallengeResponse", inputText)
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
    this.setState({input: e.target.value, feedback: ""})
    this.assert()
  }

  handleNextClick() {
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
      // submit answer
      this.submitChallengeResponse(this.state.input)
      this.props.handleNextClick()
    } else {
      this.handleShowHelp.bind(this)
    }
  }
  handleShowHelp() {
    track("Show Help", {
      name: "Help",
      action: "Show",
      challengeId: this.props.challengeId,
      content: this.props
    })
    this.setState({showHelp: true})
  }

  render() {
    let help
    if (this.state.showHelp) {
      help = (
        <li className="list-inline-item">
          <div className="challenge-help">{markdownToHTML(this.props.help || "Answer the open ended question.")}</div>
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
          <p>{markdownToHTML(this.state.feedback)}</p>
        </div>
      )
    }
    const textareaRows = this.props.textareaRows || 4
    let image
    if (this.props.image_url) {
      image = (
        <div className="row">
          <div className="col-12 col-lg-6 offset-lg-3 text-center">
            <img src={this.props.image_url} className="img-fluid simple_q_and_a-question-image_url" />
          </div>
        </div>
      )
    }
    return (
      <div className="container">
        {image}
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2 text-center">
            <div className={"simple_q_and_a-question" + (this.props.image_url ? " no-margin" : "")}>{markdownToHTML(this.props.question)}</div>
            <div className="form-group">
              <textarea className="form-control border-bottom" onKeyUp={this.handleKeyUp.bind(this)} rows={textareaRows}></textarea>
              <div className="row">
                <div className="col-12 col-sm-6">
                  {feedback}
                </div>
              </div>
            </div>
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

OpenEndedQ.propTypes = {
  question: PropTypes.string,
  min_length: PropTypes.number,
  textareaRows: PropTypes.number,
  help: PropTypes.string,

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default OpenEndedQ
