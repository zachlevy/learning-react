import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import reactStringReplace from 'react-string-replace'
import { track } from '../../../modules/analytics'
import { markdownToHTML } from '../../../modules/strings'

class Matching extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: new Array(props.matchWith.length), // intialize array
      solution: "",
      feedback: new Array(props.matchWith.length), // intialize array
      showHelp: false,
      showSubmitButton: false,
      submitButtonText: "Check Answer",
    }
  }
  assert(event) {
    console.log("assert")
    let answered
    const answers = new Array(this.props.matchWith.length)
    const newFeedbackArray = [...this.state.feedback]
    this.state.input.forEach((answer, inputIndex) => {
      const foundFeedback = this.props.feedback.find((feedback) => {
        return answer === feedback.text
      })
      if (foundFeedback) {
        newFeedbackArray[inputIndex] = foundFeedback
        if (foundFeedback.insert) {
          this.props.handleInsertChallenges(foundFeedback.insert)
        }
      } else {
        newFeedbackArray[inputIndex] = {"text": answer, prompt: "Incorrect!", correct: false}
      }
    })

    this.props.submitChallengeResponse({
      analysis: "none",
      text: this.state.input
    })
    this.setState({feedback: newFeedbackArray, showSubmitButton: false})
    this.props.handleShowNextButton()
  }

  handleSelectChange(matchWith, matchWithIndex, e) {
    console.log("handleSelectChange", matchWith, e.target.value)
    const newInputArray = [...this.state.input]
    newInputArray[matchWithIndex] = matchWith + e.target.value
    this.setState({input: newInputArray, showSubmitButton: true})
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

  handleSolutionButton(e) {
    console.log("handleSolutionButton")
    this.setState({solution: this.props.solution})
  }

  render() {
    let help
    help = (
      <li className="list-inline-item">
        <button role="button" className="btn btn-link" onClick={this.handleShowHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
      </li>
    )
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
            <img src={this.props.image_url} className="img-fluid matching-question-image_url" />
          </div>
        </div>
      )
    }
    let solution
    if (this.props.solution) {
      solution = (
        <li className="list-inline-item">
          <button role="button" className="btn btn-link" onClick={this.handleSolutionButton.bind(this)}><span>solution</span></button>
        </li>
      )
    }
    return (
      <div className="container">
        {image}
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className={"matching-question" + (this.props.image_url ? " no-margin" : "")}>{markdownToHTML(this.props.question)}</div>
            <br />
            <div className="row">
              <div className="col-12">
                {
                  this.props.matchWith.map((matchWith, matchWidthIndex) => {
                    return (
                      <div className="row" key={matchWidthIndex}>
                        <div className="col-12 col-sm-4 text-right">
                          <h3>{markdownToHTML(matchWith)}</h3>
                        </div>
                        <div className="col-12 col-sm-4">
                          <select className="form-control" onChange={this.handleSelectChange.bind(this, matchWith, matchWidthIndex)}>
                            <option></option>
                            {
                              this.props.options.map((option, optionIndex) => {
                                return (
                                  <option key={optionIndex} value={option}>{markdownToHTML(option)}</option>
                                )
                              })
                            }
                          </select>
                          <br />
                        </div>
                        <div className="col-12 col-sm-4 text-left">
                          <p>
                            {
                              this.state.feedback[matchWidthIndex] ? (this.state.feedback[matchWidthIndex].correct ? <FontAwesome name="check" /> : <FontAwesome name="times" />) : ""
                            }

                            <span> {this.state.feedback[matchWidthIndex] && this.state.feedback[matchWidthIndex].prompt}</span>
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <br />
            <button role="button" className={"btn btn-outline-secondary btn-lg" + (this.state.showSubmitButton ? "" : " disabled")} onClick={this.state.showSubmitButton && this.handleSubmitClick.bind(this)}>{this.state.submitButtonText}</button>
            <br />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            {this.state.showHelp && (markdownToHTML(this.props.help) || "Select the matching option for each.")}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <ul className="list-inline">
                {solution}
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
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            {markdownToHTML(this.state.solution)}
          </div>
        </div>
      </div>
    )
  }
}

Matching.propTypes = {
  question: PropTypes.string,
  solution: PropTypes.string,
  matchWith: PropTypes.array,
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
  challengeDescription: PropTypes.string,
  submitChallengeResponse: PropTypes.func
}

export default Matching
