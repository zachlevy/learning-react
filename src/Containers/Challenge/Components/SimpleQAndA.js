import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FontAwesome from 'react-fontawesome'
import reactStringReplace from 'react-string-replace'
import { track } from '../../../modules/analytics'
import { setFeedbackModal, setFeedbackContext } from '../../../modules/redux/feedback'
import { markdownToHTML } from '../../../modules/strings'
import { apiRequest } from '../../../modules/data'
import { setProfile } from '../../../modules/redux/profile'

class SimpleQAndA extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      solution: "",
      showHelp: false,
      feedback: "",
      submitButtonText: "Check Answer",
      showSubmitButton: true
    }
  }

  componentDidMount() {
    // gross, i don't like this approach at all. not happy.
    // expecting this.props.submitToProfile to be an object like {"key": "demographic", "attributeName": "age"}
    if (this.props.update_profile && typeof this.props.update_profile === "object") {

      // ensure profile object is up to date
      apiRequest(`/profiles/me`, {}, (response, status) => {
        if (status === 200) {
          this.props.setProfile(response)
        }
      })
    }
  }

  assert(event) {
    console.log("assert")
    console.log(this.props)
    const foundFeedback = this.props.feedback.find((feedback) => {
      if (feedback.answer_type === "regex") {
        return !!this.state.input.toLowerCase().match(feedback.text.toLowerCase())
      } else {
        return this.state.input.toLowerCase() === feedback.text.toLowerCase()
      }
    })

    if (foundFeedback) {
      if (foundFeedback.correct) {
        this.setState({feedback: foundFeedback.prompt || "Correct!", submitButtonText: "Correct", showSubmitButton: false})
        this.props.handleShowNextButton()
      } else {
        this.setState({feedback: foundFeedback.prompt || "Incorrect answer, try again!"})
      }
      if (foundFeedback.insert) {
        this.props.handleInsertChallenges(foundFeedback.insert)
      }
    } else {
      this.setState({feedback: "Incorrect answer, try again!"})
    }

    this.props.submitChallengeResponse({
      analysis: "none",
      text: this.state.input
    })

    // gross, i don't like this approach at all. not happy.
    // expecting this.props.submitToProfile to be an object like {"key": "demographic", "attributeName": "age"}
    if (this.props.update_profile && typeof this.props.update_profile === "object") {

      apiRequest(`/profiles/${this.props.profile.id}`, {
        method: "put",
        body: JSON.stringify(Object.assign(
          {},
          this.state.profile,
          {
            [this.props.update_profile.profile_key]: {
              [this.props.update_profile.attribute_name]: this.state.input
            }
          }
        ))
      }, (response, status) => {
        if (status === 200) {
          this.props.setProfile(response)
        }
      })
    }
  }

  handleKeyUp(e) {
    this.setState({input: e.target.value, feedback: ""})
    // check for enter key
    if (e.keyCode === 13) {
      this.state.showSubmitButton && this.assert()
    }
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

  handleDisagreeOnClick(e) {
    console.log("handleDisagreeOnClick")
    this.props.setFeedbackModal(true)
    this.props.setFeedbackContext(this.props)
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
    let disagreeButton // only display when answer is incorrect
    if (!this.props.showNextButton) {
      disagreeButton = <button className="btn btn-secondary btn-sm" onClick={this.handleDisagreeOnClick.bind(this)}>Disagree?</button>
    }
    let feedback
    if (this.state.feedback) {
      feedback = (
        <div className="simple_q_and_a-feedback">
          <p>{markdownToHTML(this.state.feedback)}  {disagreeButton}</p>
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
              <input className="form-control border-bottom" onKeyUp={this.handleKeyUp.bind(this)} />
              <div className="row">
                <div className="col-12 col-sm-6">
                  {feedback}
                </div>
              </div>
            </div>
            <br />
            <button role="button" className={"btn btn-outline-secondary btn-lg" + (this.state.showSubmitButton ? "" : " disabled")} onClick={this.state.showSubmitButton && this.assert.bind(this)}>{this.state.submitButtonText}</button>
            <br />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            {this.state.showHelp && (markdownToHTML(this.props.help) || "Answer the question with some keywords.")}
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

SimpleQAndA.propTypes = {
  question: PropTypes.string,
  solution: PropTypes.string,
  feedback: PropTypes.array,
  image_url: PropTypes.string,
  help: PropTypes.string,
  update_profile: PropTypes.object,

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

const mapStateToProps = state => ({
  profile: state.profile
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setFeedbackModal,
  setFeedbackContext,
  setProfile
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleQAndA)
