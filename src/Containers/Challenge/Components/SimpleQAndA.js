import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import Dictionary from '../../Shared/Dictionary'
import reactStringReplace from 'react-string-replace'

class SimpleQAndA extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      showHelp: false,
      feedback: "",
      submitButtonText: "Check Answer",
      showSubmitButton: true
    }
  }
  assert(event) {
    console.log("assert")
    let answered
    if (this.props.answer_type === "regex" && Array.isArray(this.props.answer)) {
      // regex match for array
      this.props.answer.forEach((a) => {
        if (!!this.state.input.toLowerCase().match(a.toLowerCase())) {
          answered = true
        }
      })
    } else if (this.props.answer_type === "regex") {
      // regex match
      answered = !!this.state.input.toLowerCase().match(this.props.answer.toLowerCase())
    } else if (Array.isArray(this.props.answer)) {
      // array exact
      const answersLowercase = this.props.answer.map((a) => {return a.toLowerCase()})

      answered = answersLowercase.includes(this.state.input.toLowerCase())
    } else {
      // exact match
      answered = this.state.input.toLowerCase() === this.props.answer.toLowerCase()
    }
    if (answered) {
      this.setState({feedback: "Correct!", submitButtonText: "Correct", showSubmitButton: false})
      this.props.handleShowNextButton()
    } else {
      this.setState({feedback: "Incorrect answer, try again!"})
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

  handleKeyUp(e) {
    this.setState({input: e.target.value, feedback: ""})
    // check for enter key
    if (e.keyCode === 13) {
      this.state.showSubmitButton && this.assert()
    }
  }

  handleNextClick() {
    if (this.props.showNextButton) {
      this.props.handleNextClick(this)
    } else {
      this.handleShowHelp(this)
    }
  }
  handleShowHelp() {
    this.setState({showHelp: true})
  }

  render() {
    const remainingCharacters = this.props.max_length - this.state.input.length
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
        <div className="simple_q_and_a-feedback">
          <p>{this.state.feedback}</p>
        </div>
      )
    }
    let question = this.props.question
    this.props.dictionary && this.props.dictionary.forEach((dictTerm, index) => {
      question = reactStringReplace(question, dictTerm.term, (match, i) => {
        return <Dictionary index={"dictionary-" + index} term={dictTerm.term} definition={dictTerm.definition} link={dictTerm.link} />
      })
    })
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2 text-center">
            <h2 className="simple_q_and_a-question">{question}</h2>
            <div className="form-group">
              <input className="form-control border-bottom" onKeyUp={this.handleKeyUp.bind(this)} />
              <div className="row">
                <div className="col-12 col-sm-6">
                  {feedback}
                </div>
                <div className="col-12 col-sm-6">
                  <span className={"pull-right" + (remainingCharacters < 0 ? " color-red" : "")}>{remainingCharacters}</span>
                </div>
              </div>
            </div>
            <br />
            <button role="button" className={"btn btn-outline-secondary btn-lg" + (this.state.showSubmitButton ? "" : " disabled")} onClick={this.state.showSubmitButton && this.assert.bind(this)}>{this.state.submitButtonText}</button>
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

SimpleQAndA.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  max_length: PropTypes.number,

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default SimpleQAndA
