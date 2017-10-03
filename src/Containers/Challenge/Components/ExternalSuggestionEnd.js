import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { track } from '../../../modules/analytics'
import { markdownToHTML } from '../../../modules/strings'

class ExternalSuggestionEnd extends Component {
  constructor() {
    super()
    this.state = {
      showHelp: false
    }
  }
  handleExternalContentClick(content) {
    track("Click External Content", {
      name: "External Content",
      action: "Click",
      challengeId: this.props.challengeId,
      content: content
    })
    window.open(content.external_url, '_blank')
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
    help = (
      <li className="list-inline-item">
        <button className="btn btn-link btn-pointer" onClick={this.handleShowHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
      </li>
    )
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h3 className="text-center">Want to dive deeper?</h3>
            <br />
          </div>
        </div>
        <div className="row">
          {
            this.props.external_contents && this.props.external_contents.map((content, index) => {
              return (
                <div className="col-4 text-center">
                  <button className="btn btn-outline-secondary btn-block btn-pointer" onClick={this.handleExternalContentClick.bind(this, content)}>
                    <br />
                    <br />
                    <h1><FontAwesome name={content.icon} /></h1>
                    <p>{content.text}</p>
                    <br />
                    <br />
                  </button>
                  <br />
                </div>
              )
            })
          }
        </div>
        <div className="row">
          <div className="col-12">
            {this.state.showHelp && (markdownToHTML(this.props.help) || "Check out these relevant resources if you'd like.")}
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
                  <button className={"btn btn-outline-secondary btn-lg btn-pointer"} onClick={this.handleNextClick.bind(this)}>Next</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ExternalSuggestionEnd.propTypes = {
  external_contents: PropTypes.array,
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

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),

}, dispatch)


export default connect(
  null,
  mapDispatchToProps
)(ExternalSuggestionEnd)
