import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import reactStringReplace from 'react-string-replace'
import { track } from '../../../modules/analytics'
import { markdownToHTML } from '../../../modules/strings'

class MultipleChoice extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      feedback: "",
      showHelp: false,
      showSubmitButton: true,
      submitButtonText: "Check Answer",
    }
  }
  assert(event) {
    console.log("assert")
    const foundFeedback = this.props.feedback.find((feedback) => {
      return feedback.text === this.state.input
    })
    if (foundFeedback) {
      if (foundFeedback.correct) {
        this.setState({submitButtonText: "Correct", showSubmitButton: false})
        this.props.handleShowNextButton()
      }
      if (foundFeedback.prompt) {
        this.setState({feedback: foundFeedback.prompt})
      }
      if (foundFeedback.insert) {
        this.props.handleInsertChallenges(foundFeedback.insert)
      }
    } else {
      // no feedback, assume it's wrong
      this.setState({feedback: "Incorrect answer!"})
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

  handleOptionClick(option, e) {
    console.log("handleOptionClick")
    this.setState({input: option, feedback: ""})
  }

  handleSubmitClick(e) {
    console.log("handleSubmitClick")
    this.state.showSubmitButton && this.assert()
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
      this.props.handleNextClick(this)
    } else {
      this.assert()
      this.handleShowHelp()
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
          <div className="challenge-help">{markdownToHTML(this.props.help || "Select one option and check the answer.")}</div>
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
        <div className="multiple_choice-feedback">
          <p>{markdownToHTML(this.state.feedback)}</p>
        </div>
      )
    }
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
            <div className={"multiple_choice-question" + (this.props.image_url ? " no-margin" : "")}>{markdownToHTML(this.props.question)}</div>
            <br />
            <div className="form-group">
              <div className="row">
                {
                  this.props.options.map((option, index) => {
                    return (
                      <div key={index} className="col-6 multiple-choice-option-wrapper">
                        <button role="button" className={"btn btn-outline-secondary btn-mc btn-block multiple-choice-option" + (this.state.input === option ? " active" : "")} onClick={this.handleOptionClick.bind(this, option)}>{markdownToHTML(option)}</button>
                        <br />
                      </div>
                    )
                  })
                }
              </div>
              <div className="row">
                <div className="col-12 col-sm-6">
                  {feedback}
                </div>
              </div>
            </div>
            <br />
            <button role="button" className={"btn btn-outline-secondary btn-lg" + (this.state.showSubmitButton ? "" : " disabled")} onClick={this.state.showSubmitButton && this.handleSubmitClick.bind(this)}>{this.state.submitButtonText}</button>
            <br />
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

MultipleChoice.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  feedback: PropTypes.array,
  image_url: PropTypes.string,
  help: PropTypes.string,

  handleInsertChallenges: PropTypes.func,
  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default MultipleChoice
