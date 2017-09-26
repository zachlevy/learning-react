import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import reactStringReplace from 'react-string-replace'
import { track } from '../../../modules/analytics'
import { markdownToHTML } from '../../../modules/strings'
import { apiRequest } from '../../../modules/strings'

class OpenEndedQ extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      solution: "",
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
      this.props.submitChallengeResponse({
        analysis: "none",
        text: this.state.input
      })
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
          <div className="col-12 col-lg-8 offset-lg-2">
            {markdownToHTML(this.state.solution)}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            {this.state.showHelp && (markdownToHTML(this.props.help) || "Answer the open ended question.")}
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
      </div>
    )
  }
}

OpenEndedQ.propTypes = {
  question: PropTypes.string,
  solution: PropTypes.string,
  min_length: PropTypes.number,
  textareaRows: PropTypes.number,
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

export default OpenEndedQ
