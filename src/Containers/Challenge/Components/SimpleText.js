import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { track } from '../../../modules/analytics'
import { secondsToMinutes } from "../../../modules/time"
import { simpleMarkdown } from '../../../modules/strings'

class SimpleText extends Component {
  constructor() {
    super()
    this.state = {
      showHelp: false
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
    this.props.handleNextClick(this)
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
          <div className="col-12 col-lg-8 offset-lg-2">
            <br />
            <h4>Read the text</h4>
            <div>{simpleMarkdown(this.props.text)}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <ul className="list-inline">
                <li className="list-inline-item">
                  <span className="btn">{secondsToMinutes(this.props.est_duration)} min</span>
                </li>
                {help}
                <li className="list-inline-item">
                  <button role="button" className="btn btn-link" onClick={this.props.handleBackButton.bind(this)}><span>back</span></button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-link" onClick={this.props.handleSkipClick.bind(this, this.props.challengeId, this.state.showHelp)}>skip</button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className={"btn btn-outline-secondary btn-lg"} onClick={this.handleNextClick.bind(this)}>Next</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SimpleText.propTypes = {
  text: PropTypes.string,
  est_duration: PropTypes.number,

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
}, dispatch)


export default connect(
  null,
  mapDispatchToProps
)(SimpleText)
