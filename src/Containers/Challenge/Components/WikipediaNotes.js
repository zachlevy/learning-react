import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { secondsToMinutes } from '../../../modules/time'
import FontAwesome from 'react-fontawesome'
import { track } from '../../../modules/analytics'
import { markdownToHTML } from '../../../modules/strings'
import { apiRequest } from '../../../modules/data'

class WikipediaNotes extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      showHelp: false,
      feedback: ""
    }
  }
  assert() {
    if (this.state.input && this.state.input.length >= 10) {
      this.props.handleShowNextButton()
    }
  }

  handleKeyUp(e) {
    this.setState({input: e.target.value})
    this.assert()
  }

  // intercept next button click
  handleNextClick() {
    this.props.submitChallengeResponse({
      analysis: "none",
      text: this.state.input
    })
    this.props.handleNextClick()
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
      this.props.submitChallengeResponse({
        analysis: "none",
        text: this.state.input
      })
    } else {
      this.setState({showHelp: true})
    }
  }

  render() {
    const content = this.props
    let help
    help = (
      <li className="list-inline-item">
        <button role="button" className="btn btn-link" onClick={this.handleShowHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
      </li>
    )
    let feedback
    if (this.state.feedback) {
      feedback = (
        <div className="wikipedia_notes-feedback">
          <p>{this.state.feedback}</p>
        </div>
      )
    }
    const remainingCharacters = this.props.max_length - this.state.input.length
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <br />
            <div className="form-group">
              <ol className="">
                {
                  content.instructions && content.instructions.map((instruction, index) => {
                    instruction = markdownToHTML(instruction)
                    return <li className="" key={index}>{instruction}</li>
                  })
                }
              </ol>
              <label htmlFor="notes">Notes</label>
              <textarea className="form-control border-bottom" id="notes" rows="15" onKeyUp={this.handleKeyUp.bind(this)} placeholder="..."></textarea>
              <div className="row">
                <div className="col-12 col-sm-6">
                  {feedback}
                </div>
                <div className="col-12 col-sm-6">
                  <span className={"pull-right" + (remainingCharacters < 0 ? " color-red" : "")}>{remainingCharacters}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {this.state.showHelp && (markdownToHTML(this.props.help) || "Read the instructions then read the Wikipedia section(s)")}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="float-md-right">
                    <br />
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <span className="btn">{secondsToMinutes(content.est_duration)} min</span>
                      </li>
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
          </div>
          <div className="col-12 col-sm-6">
            <br />
            <div className="">
              <iframe id="wikipedia-iframe" className="wikipedia wikpedia-notes" src={process.env.REACT_APP_WIKIPEDIA_URL + content.embed_url + "?highlights=" + encodeURIComponent(JSON.stringify(content.highlights))} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

WikipediaNotes.propTypes = {
  embed_url: PropTypes.string,
  title: PropTypes.string,
  est_duration: PropTypes.number,
  max_length: PropTypes.number,
  instructions: PropTypes.array,
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

export default WikipediaNotes
