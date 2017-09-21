import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import reactStringReplace from 'react-string-replace'
import { track } from '../../../modules/analytics'

class MultipleMultipleChoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: new Array(props.options.length), // intialize array
      feedback: "",
      showHelp: false,
      showSubmitButton: true,
      submitButtonText: "Check Answer",
    }
  }
  assert(event) {
    console.log("assert")
    const input = this.state.input.join("")
    let answered
    console.log("assert", this.props.correct_answer, input)
    const foundFeedback = this.props.feedback.find((feedback) => {
      return feedback.text === input
    })
    if (foundFeedback.correct) {
      this.setState({feedback: foundFeedback.prompt, submitButtonText: "Correct", showSubmitButton: false})
      this.props.handleShowNextButton()
    } else {
      this.setState({feedback: foundFeedback.prompt || "Incorrect answer!", submitButtonText: "Incorrect"})
      this.props.handleInsertDependencies(this.state.input)
      this.props.handleShowNextButton()
    }

    // check if answer is correct
    this.submitChallengeResponse(this.state.input)
    this.setState({showSubmitButton: false})
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

  handleOptionClick(optionGroupIndex, e) {
    console.log("handleOptionClick")
    const newInputArray = [...this.state.input]
    newInputArray[optionGroupIndex] = e.target.innerHTML
    this.setState({input: newInputArray, feedback: ""})
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
          <p className="challenge-description">{this.props.challengeDescription}</p>
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
          <p>{this.state.feedback}</p>
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
    let questionDetails
    if (this.props.question_details) {
      questionDetails = <p className={"multiple_choice-question_details"}>{this.props.question_details}</p>
    }
    return (
      <div className="container">
        {image}
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1 text-center">
            <h2 className={"multiple_choice-question" + (this.props.image_url ? " no-margin" : "")}>{this.props.question}</h2>
            {questionDetails}
            <br />
            <div className="form-group">
              <div className="row">
                {
                  this.props.options.map((optionGroup, optionGroupIndex) => {
                    return (
                      <div className="col-12 col-sm-6" key={optionGroupIndex}>
                        <div className="row">
                          {
                            optionGroup.map((option, index) => {
                              return (
                                <div key={index} className="col-6">
                                  <button role="button" className={"btn btn-outline-secondary btn-mc btn-block" + (this.state.input.indexOf(option) === -1 ? "" : " active")} onClick={this.handleOptionClick.bind(this, optionGroupIndex)}>{option}</button>
                                  <br />
                                </div>
                              )
                            })
                          }
                        </div>
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

MultipleMultipleChoice.propTypes = {
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  options: PropTypes.array,
  feedback: PropTypes.array,
  image_url: PropTypes.string,

  handleInsertDependencies: PropTypes.func,
  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default MultipleMultipleChoice
